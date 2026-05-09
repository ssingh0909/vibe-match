import { connect } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        const gender = data.get('gender')?.toString();
        const age = data.get('age')?.toString();
        const hobbiesRaw = data.get('hobbies')?.toString();
        const notifications = data.get('notifications') === 'on';

        if (!email) return redirect(303, '/register');

        let hobbies: string[] = [];
        try {
            hobbies = JSON.parse(hobbiesRaw || '[]');
        } catch (e) {
            hobbies = hobbiesRaw ? hobbiesRaw.split(',').map(h => h.trim()) : [];
        }

        const db = await connect();
        const users = db.collection('users');

        await users.insertOne({
            email,
            password,
            gender,
            age: parseInt(age || '0'),
            hobbies,
            notifications,
            createdAt: new Date()
        });

        // Set session cookie
        cookies.set('userEmail', email, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7
        });

        throw redirect(303, '/feed');
    }
};
