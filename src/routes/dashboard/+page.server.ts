import { connect } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const userEmail = cookies.get('userEmail');
    if (!userEmail) {
        throw redirect(303, '/');
    }

    try {
        const db = await connect();
        
        // Find bookings (activities where joinedUsers contains the email)
        const myBookings = await db.collection('activities')
            .find({ joinedUsers: userEmail })
            .toArray();

        return {
            userEmail,
            bookings: myBookings.map(b => ({
                id: b._id.toString(),
                title: b.title,
                location: b.location,
                time: b.time,
                image: b.image
            }))
        };
    } catch (e) {
        console.error('Failed to load dashboard:', e);
        return {
            userEmail,
            bookings: []
        };
    }
};
