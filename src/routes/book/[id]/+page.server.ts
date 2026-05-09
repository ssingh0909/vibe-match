import { connect } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { error, redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
    const userEmail = cookies.get('userEmail');
    
    try {
        const db = await connect();
        const activitiesCollection = db.collection('activities');
        const activity = await activitiesCollection.findOne({ _id: new ObjectId(params.id) });

        if (!activity) {
            throw error(404, 'Aktivität nicht gefunden');
        }

        const joinedUsers = activity.joinedUsers || [];
        const isJoined = userEmail ? joinedUsers.includes(userEmail) : false;

        return {
            activity: {
                id: activity._id.toString(),
                title: activity.title,
                location: activity.location,
                time: activity.time,
                participants: activity.participants,
                joinedUsers: joinedUsers
            },
            isJoined
        };
    } catch (e) {
        console.error('Failed to load activity:', e);
        throw error(500, 'Server Fehler');
    }
};

export const actions: Actions = {
    join: async ({ params, cookies }) => {
        const userEmail = cookies.get('userEmail');
        if (!userEmail) throw redirect(303, '/');

        const db = await connect();
        const activitiesCollection = db.collection('activities');

        const currentActivity = await activitiesCollection.findOne({ _id: new ObjectId(params.id) });
        if (!currentActivity) return fail(404, { error: 'Aktivität nicht gefunden' });

        // Check for time conflicts
        const conflictingActivity = await activitiesCollection.findOne({
            _id: { $ne: new ObjectId(params.id) },
            joinedUsers: userEmail,
            time: currentActivity.time
        });

        if (conflictingActivity) {
            return fail(400, { 
                error: `Zeitkonflikt: Du bist zur gleichen Zeit bereits bei "${conflictingActivity.title}" angemeldet.` 
            });
        }

        await activitiesCollection.updateOne(
            { _id: new ObjectId(params.id) },
            { $addToSet: { joinedUsers: userEmail } }
        );

        throw redirect(303, '/success');
    },

    cancel: async ({ params, cookies }) => {
        const userEmail = cookies.get('userEmail');
        if (!userEmail) throw redirect(303, '/');

        const db = await connect();
        const activitiesCollection = db.collection('activities');

        await activitiesCollection.updateOne(
            { _id: new ObjectId(params.id) },
            { $pull: { joinedUsers: userEmail } }
        );

        throw redirect(303, '/dashboard');
    }
};
