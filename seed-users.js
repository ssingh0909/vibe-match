import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
}

async function seedUsers() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('vibematch');
        const users = db.collection('users');

        console.log('Deleting existing test users...');
        await users.deleteMany({ isTestUser: true });

        const testUsers = [];
        const genders = ['Männlich', 'Weiblich', 'Divers'];
        const hobbyPool = [
            'Badminton', 'Bowling', 'Wandern', 'Yoga', 'Fußball', 
            'Klettern', 'Schwimmen', 'Kochen', 'Ausgehen', 'Gaming', 
            'Fotografie', 'Museum', 'Konzerte', 'Karaoke'
        ];

        console.log('Generating 1000 test users...');
        for (let i = 1; i <= 1000; i++) {
            const numHobbies = Math.floor(Math.random() * 3) + 1;
            const userHobbies = [];
            for (let j = 0; j < numHobbies; j++) {
                userHobbies.push(hobbyPool[Math.floor(Math.random() * hobbyPool.length)]);
            }

            testUsers.push({
                email: `testuser${i}@example.com`,
                password: 'password123', // Static password for all test users
                gender: genders[Math.floor(Math.random() * genders.length)],
                age: Math.floor(Math.random() * (60 - 18 + 1)) + 18,
                hobbies: [...new Set(userHobbies)],
                notifications: Math.random() > 0.5,
                isTestUser: true,
                createdAt: new Date()
            });
        }

        console.log('Inserting into database...');
        const result = await users.insertMany(testUsers);
        console.log(`Successfully inserted ${result.insertedCount} test users.`);

    } catch (error) {
        console.error('Error seeding users:', error);
    } finally {
        await client.close();
    }
}

seedUsers();
