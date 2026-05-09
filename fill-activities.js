import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
}

async function fillRandomActivities() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('vibematch');
        const activitiesCol = db.collection('activities');
        const usersCol = db.collection('users');

        const activities = await activitiesCol.find({}).toArray();
        const users = await usersCol.find({}).toArray();

        console.log('Filling 5 random activities to capacity...');
        
        // Pick 5 random activities to mark as full
        const shuffled = activities.sort(() => 0.5 - Math.random());
        const toFill = shuffled.slice(0, 5);

        for (const activity of toFill) {
            const maxPart = parseInt(activity.participants.split('/')[1]) || 8;
            const shuffledUsers = users.sort(() => 0.5 - Math.random());
            const selectedUsers = shuffledUsers.slice(0, maxPart).map(u => u.email);

            await activitiesCol.updateOne(
                { _id: activity._id },
                { $set: { joinedUsers: selectedUsers } }
            );
        }

        console.log('Successfully filled 5 activities.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

fillRandomActivities();
