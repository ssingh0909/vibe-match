import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function setupSocial() {
    try {
        await client.connect();
        const db = client.db('vibematch');
        
        // 1. Create Chats Collection
        // Schema: { type: 'group'|'private', participants: [email], activityId?: ID, messages: [{sender, text, timestamp}] }
        const chats = db.collection('chats');
        
        // 2. Add some friends to the current user (if one exists)
        const users = db.collection('users');
        const mainUser = await users.findOne({ isTestUser: { $ne: true } });
        
        if (mainUser) {
            const testUsers = await users.find({ isTestUser: true }).limit(5).toArray();
            const friendEmails = testUsers.map(u => u.email);
            
            await users.updateOne(
                { _id: mainUser._id },
                { $set: { friends: friendEmails } }
            );

            // Create a private chat for one friend
            await chats.insertOne({
                type: 'private',
                participants: [mainUser.email, friendEmails[0]],
                messages: [
                    { sender: friendEmails[0], text: 'Hey! Lust auf Badminton am Dienstag?', timestamp: new Date() }
                ]
            });
        }

        console.log('Social system database structures initialized.');
    } finally {
        await client.close();
    }
}

setupSocial();
