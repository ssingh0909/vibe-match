import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
}

async function assignUsersToActivities() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('vibematch');
        const activitiesCol = db.collection('activities');
        const usersCol = db.collection('users');

        const activities = await activitiesCol.find({}).toArray();
        const users = await usersCol.find({}).toArray();

        if (users.length === 0) {
            console.error('No users found in database. Run seed-users.js first.');
            return;
        }

        console.log(`Assigning users to ${activities.length} activities...`);

        for (const activity of activities) {
            // Randomly decide how many users should join (between 1 and max allowed or 5)
            const maxPart = parseInt(activity.participants.split('/')[1]) || 8;
            const numToJoin = Math.floor(Math.random() * Math.min(maxPart, 6)) + 1; 
            
            // Pick random users
            const shuffledUsers = users.sort(() => 0.5 - Math.random());
            const selectedUsers = shuffledUsers.slice(0, numToJoin).map(u => u.email);

            await activitiesCol.updateOne(
                { _id: activity._id },
                { $set: { joinedUsers: selectedUsers } }
            );
        }

        console.log('Successfully assigned random users to all activities.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

assignUsersToActivities();
