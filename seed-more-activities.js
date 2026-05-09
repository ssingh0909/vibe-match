import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
}

const ZHAW_COORDS = { lat: 47.5020, lng: 8.7250 };

const activityTypes = [
    { title: 'Tennis Doppel', img: 'https://images.unsplash.com/photo-1595435064219-cdd8ed129fe4?auto=format&fit=crop&q=80&w=800' },
    { title: 'Lauftreff am See', img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800' },
    { title: 'Pub Quiz Abend', img: 'https://images.unsplash.com/photo-1597075484447-e50b9bb0ce8a?auto=format&fit=crop&q=80&w=800' },
    { title: 'Karten spielen (Jass)', img: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&q=80&w=800' },
    { title: 'MTB Tour', img: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=800' },
    { title: 'Grillen & Chillen', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },
    { title: 'Vernissage Besuch', img: 'https://images.unsplash.com/photo-1531050171652-597462c8ef22?auto=format&fit=crop&q=80&w=800' },
    { title: 'Fussball Match', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800' },
    { title: 'Kino Abend', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800' },
    { title: 'Schach im Park', img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=800' }
];

const locations = [
    { name: 'Winterthur Altstadt', lat: 47.4990, lng: 8.7290 }, // ~0.5km
    { name: 'Winterthur Seen', lat: 47.4880, lng: 8.7550 },     // ~3km
    { name: 'Winterthur Wülflingen', lat: 47.5150, lng: 8.6950 }, // ~2.5km
    { name: 'Oberwinterthur', lat: 47.5120, lng: 8.7520 },    // ~2km
    { name: 'Effretikon', lat: 47.4270, lng: 8.6870 },       // ~9km
    { name: 'Illnau', lat: 47.4080, lng: 8.7180 },            // ~10km
    { name: 'Frauenfeld', lat: 47.5560, lng: 8.8970 },       // ~14km
    { name: 'Dübendorf', lat: 47.3980, lng: 8.6180 },        // ~14km
    { name: 'Zürich Oerlikon', lat: 47.4110, lng: 8.5440 },  // ~17km
    { name: 'Zürich Enge', lat: 47.3630, lng: 8.5350 },      // ~21km
    { name: 'Schaffhausen', lat: 47.6960, lng: 8.6340 },     // ~22km
    { name: 'Wetzikon', lat: 47.3270, lng: 8.7980 },         // ~20km
    { name: 'Bülach', lat: 47.5190, lng: 8.5410 }           // ~14km
];

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function seedManyActivities() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('vibematch');
        const activities = db.collection('activities');

        console.log('Generating 50 additional activities...');
        const newActivities = [];
        const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

        for (let i = 0; i < 50; i++) {
            const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
            const loc = locations[Math.floor(Math.random() * locations.length)];
            const day = days[Math.floor(Math.random() * days.length)];
            const hour = Math.floor(Math.random() * 5) + 17; // 17:00 to 21:00
            const maxParticipants = Math.floor(Math.random() * 10) + 4;
            
            const distance = calculateDistance(ZHAW_COORDS.lat, ZHAW_COORDS.lng, loc.lat, loc.lng);

            newActivities.push({
                title: type.title,
                location: loc.name,
                lat: loc.lat,
                lng: loc.lng,
                time: `${day}, ${hour}:00 Uhr`,
                participants: `0/${maxParticipants}`,
                image: type.img,
                distance: parseFloat(distance.toFixed(1)),
                joinedUsers: [],
                createdAt: new Date()
            });
        }

        const result = await activities.insertMany(newActivities);
        console.log(`Successfully added ${result.insertedCount} additional activities.`);

    } catch (error) {
        console.error('Error seeding more activities:', error);
    } finally {
        await client.close();
    }
}

seedManyActivities();
