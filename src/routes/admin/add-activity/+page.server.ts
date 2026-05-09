import { connect } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const title = data.get('title');
        const location = data.get('location');
        const time = data.get('time');
        const participants = data.get('participants');
        const image = data.get('image');

        const db = await connect();
        const activities = db.collection('activities');

        await activities.insertOne({
            title,
            location,
            time,
            participants,
            image,
            createdAt: new Date()
        });

        throw redirect(303, '/feed');
    }
};
