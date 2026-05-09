import { connect } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (!email || !password) {
            return fail(400, { error: 'Email und Passwort sind erforderlich' });
        }

        const db = await connect();
        const users = db.collection('users');
        const user = await users.findOne({ email });

        if (!user) {
            return fail(404, { error: 'Benutzer existiert nicht.' });
        }

        if (user.password !== password) {
            return fail(401, { error: 'Ungültiges Passwort' });
        }

        // Set simple session cookie
        cookies.set('userEmail', email, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        throw redirect(303, '/feed');
    }
};
