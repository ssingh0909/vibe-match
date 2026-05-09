import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

if (!env.MONGODB_URI) {
    throw new Error('Please add your MONGODB_URI to .env');
}

const client = new MongoClient(env.MONGODB_URI);

export async function connect() {
    await client.connect();
    return client.db();
}

export default client;
