import { connect } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { error, redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
    const userEmail = cookies.get('userEmail');
    if (!userEmail) throw redirect(303, '/');

    const { chatId } = params;
    const db = await connect();
    const chats = db.collection('chats');

    let chat;
    if (chatId.startsWith('group-')) {
        const activityId = chatId.replace('group-', '');
        // Find or create group chat for activity
        chat = await chats.findOne({ type: 'group', activityId });
        
        if (!chat) {
            const activities = db.collection('activities');
            const activity = await activities.findOne({ _id: new ObjectId(activityId) });
            if (!activity) throw error(404, 'Aktivität nicht gefunden');
            
            // Create chat on the fly
            const newChat = {
                type: 'group',
                activityId,
                title: activity.title,
                participants: activity.joinedUsers || [],
                messages: []
            };
            const result = await chats.insertOne(newChat);
            chat = { ...newChat, _id: result.insertedId };
        }
    } else {
        chat = await chats.findOne({ _id: new ObjectId(chatId) });
        if (!chat) throw error(404, 'Chat nicht gefunden');
        if (!chat.participants.includes(userEmail)) throw error(403, 'Zugriff verweigert');
    }

    return {
        chat: {
            id: chat._id.toString(),
            type: chat.type,
            title: chat.title || null,
            participants: chat.participants,
            messages: chat.messages || []
        },
        userEmail
    };
};

export const actions: Actions = {
    send: async ({ request, params, cookies }) => {
        const userEmail = cookies.get('userEmail');
        if (!userEmail) return fail(401);

        const data = await request.formData();
        const text = data.get('text') as string;

        if (!text) return fail(400, { message: 'Text is required' });

        const { chatId } = params;
        const db = await connect();
        const chats = db.collection('chats');

        const message = {
            sender: userEmail,
            text,
            timestamp: new Date()
        };

        if (chatId.startsWith('group-')) {
            const activityId = chatId.replace('group-', '');
            await chats.updateOne(
                { type: 'group', activityId },
                { $push: { messages: message } }
            );
        } else {
            await chats.updateOne(
                { _id: new ObjectId(chatId) },
                { $push: { messages: message } }
            );
        }

        return { success: true };
    }
};
