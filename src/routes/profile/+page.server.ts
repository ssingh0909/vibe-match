import { connect } from '$lib/server/db';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const userEmail = cookies.get('userEmail');
    if (!userEmail) throw redirect(303, '/');

    const db = await connect();
    const user = await db.collection('users').findOne({ email: userEmail });

    if (!user) throw error(404, 'Benutzer nicht gefunden');

    return {
        user: {
            email: user.email,
            gender: user.gender,
            age: user.age,
            hobbies: user.hobbies || [],
            notifications: user.notifications
        }
    };
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const userEmail = cookies.get('userEmail');
        if (!userEmail) throw redirect(303, '/');
const data = await request.formData();
const gender = data.get('gender');
const age = data.get('age');
const imageUrl = data.get('imageUrl');
const hobbiesRaw = data.get('hobbies')?.toString();
const notifications = data.get('notifications') === 'on';

let hobbies: string[] = [];
try {
    hobbies = JSON.parse(hobbiesRaw || '[]');
} catch (e) {
    hobbies = hobbiesRaw ? hobbiesRaw.split(',').map(h => h.trim()) : [];
}

const db = await connect();
await db.collection('users').updateOne(
    { email: userEmail },
    {
        $set: {
            gender,
            age: parseInt(age?.toString() || '0'),
            imageUrl,
            hobbies,
            notifications,
            updatedAt: new Date()
        }
    }
);

        return { success: true };
    }
};
