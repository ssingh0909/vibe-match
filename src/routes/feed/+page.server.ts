import { connect } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { CATEGORIES, HOBBIES } from '$lib/constants';

export const load: PageServerLoad = async ({ cookies }) => {
    try {
        const userEmail = cookies.get('userEmail');
        const db = await connect();
        
        // Fetch user hobbies
        let userHobbies: string[] = [];
        let userCategories: string[] = [];
        
        if (userEmail) {
            const user = await db.collection('users').findOne({ email: userEmail });
            if (user) {
                userHobbies = user.hobbies || [];
                // Map user hobbies to categories
                userCategories = userHobbies.map(h => {
                    const hobbyObj = HOBBIES.find(item => item.name === h);
                    return hobbyObj ? hobbyObj.category : null;
                }).filter(Boolean) as string[];
            }
        }

        const activitiesCollection = db.collection('activities');
        // Fetch all activities
        const activities = await activitiesCollection.find().toArray();

        const mappedActivities = activities.map(a => {
            const joinedUsers = (a.joinedUsers || []) as string[];
            const joinedCount = joinedUsers.length;
            const maxParticipants = parseInt(a.participants.split('/')[1]) || 8;
            const isFull = joinedCount >= maxParticipants;
            
            // Check if user has already joined (case-insensitive and trimmed)
            const isJoined = userEmail 
                ? joinedUsers.some(u => u.trim().toLowerCase() === userEmail.trim().toLowerCase()) 
                : false;
            
            // Calculate interest score
            let interestScore = 0;
            if (userHobbies.includes(a.hobby)) {
                interestScore = 100; // Exact hobby match
            } else if (userCategories.includes(a.category)) {
                interestScore = 50; // Category match
            }

            return {
                id: a._id.toString(),
                title: a.title,
                location: a.location,
                time: a.time,
                participants: a.participants,
                image: a.image,
                category: a.category || 'Sonstiges',
                hobby: a.hobby,
                joinedCount,
                maxParticipants,
                distance: a.distance || 1.5,
                isFull,
                isJoined,
                interestScore
            };
        });

        // Sort by interest score (desc) then distance (asc)
        mappedActivities.sort((a, b) => {
            if (b.interestScore !== a.interestScore) {
                return b.interestScore - a.interestScore;
            }
            return a.distance - b.distance;
        });

        // Filter out joined activities from the available and full lists
        const available = mappedActivities.filter(a => !a.isFull && !a.isJoined);
        const full = mappedActivities.filter(a => a.isFull && !a.isJoined);

        return {
            activities: available,
            full: full,
            categories: CATEGORIES,
            userHobbies
        };
    } catch (e) {
        console.error('Failed to load activities:', e);
        return {
            activities: [],
            full: [],
            categories: CATEGORIES,
            userHobbies: []
        };
    }
};
