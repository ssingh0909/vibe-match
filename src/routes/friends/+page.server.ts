import { connect } from '$lib/server/db';
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
    const userEmail = cookies.get('userEmail');
    if (!userEmail) {
        throw redirect(303, '/');
    }

    const searchQuery = url.searchParams.get('q');

    try {
        const db = await connect();
        const users = db.collection('users');
        
        const currentUser = await users.findOne({ email: userEmail });
        const friendEmails = currentUser?.friends || [];

        // Fetch details for friends
        const friends = await users.find({ email: { $in: friendEmails } }).toArray();

        // Fetch potential new friends or search results
        let query: any = { email: { $nin: [...friendEmails, userEmail] } };
        
        // If there's a search query, prioritize searching all users (except self and existing friends)
        if (searchQuery) {
            query.email = { 
                $regex: searchQuery, 
                $options: 'i',
                $nin: [...friendEmails, userEmail]
            };
        }

        const potentialFriends = await users.find(query).limit(20).toArray();

        return {
            friends: friends.map(u => ({
                email: u.email,
                gender: u.gender,
                age: u.age,
                hobbies: u.hobbies,
                imageUrl: u.imageUrl
            })),
            potentialFriends: potentialFriends.map(u => ({
                email: u.email,
                gender: u.gender,
                age: u.age,
                hobbies: u.hobbies,
                imageUrl: u.imageUrl
            })),
            searchQuery
        };
    } catch (e) {
        console.error('Failed to load friends:', e);
        return {
            friends: [],
            potentialFriends: []
        };
    }
};

export const actions: Actions = {
    addFriend: async ({ request, cookies }) => {
        const userEmail = cookies.get('userEmail');
        if (!userEmail) return fail(401);

        const data = await request.formData();
        const friendEmail = data.get('friendEmail') as string;

        if (!friendEmail) return fail(400, { message: 'Friend email is required' });

        try {
            const db = await connect();
            const users = db.collection('users');

            await users.updateOne(
                { email: userEmail },
                { $addToSet: { friends: friendEmail } }
            );

            // Also add self to friend's list (reciprocal)
            await users.updateOne(
                { email: friendEmail },
                { $addToSet: { friends: userEmail } }
            );

            return { success: true };
        } catch (e) {
            console.error('Failed to add friend:', e);
            return fail(500, { message: 'Internal server error' });
        }
    }
};
