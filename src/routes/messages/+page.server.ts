import { connect } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
    const userEmail = cookies.get('userEmail');
    if (!userEmail) {
        throw redirect(303, '/');
    }

    const startChatWith = url.searchParams.get('with');

    try {
        const db = await connect();
        const chats = db.collection('chats');
        const activities = db.collection('activities');

        if (startChatWith) {
            // Check if private chat already exists
            let chat = await chats.findOne({
                type: 'private',
                participants: { $all: [userEmail, startChatWith] }
            });

            if (!chat) {
                // Create new private chat
                const result = await chats.insertOne({
                    type: 'private',
                    participants: [userEmail, startChatWith],
                    messages: []
                });
                throw redirect(303, `/messages/${result.insertedId}`);
            } else {
                throw redirect(303, `/messages/${chat._id}`);
            }
        }

        // 1. Fetch private chats
        const privateChats = await chats.find({
            type: 'private',
            participants: userEmail
        }).toArray();

        // 2. Fetch activity-based chats
        // We look for activities the user has joined
        const joinedActivities = await activities.find({
            joinedUsers: userEmail
        }).toArray();

        // For each activity, ensure there's a chat or just provide info
        const activityChats = joinedActivities.map(a => ({
            id: a._id.toString(),
            title: a.title,
            type: 'group',
            activityId: a._id.toString()
        }));

        return {
            privateChats: privateChats.map(c => ({
                id: c._id.toString(),
                participants: c.participants,
                lastMessage: c.messages?.[c.messages.length - 1] || null
            })),
            activityChats
        };
    } catch (e) {
        console.error('Failed to load messages:', e);
        return {
            privateChats: [],
            activityChats: []
        };
    }
};
