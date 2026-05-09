import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
}

const ZHAW_COORDS = { lat: 47.5020, lng: 8.7250 };

const activityDefinitions = [
    { title: 'Badminton Doppel', img: 'https://images.unsplash.com/photo-1626225967045-94403165b497?q=80&w=800' },
    { title: 'Bowling Night', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800' },
    { title: 'Yoga im Park', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800' },
    { title: 'Uetliberg Wanderung', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800' },
    { title: 'Afterwork Drinks', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800' },
    { title: 'Kletter-Session', img: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800' },
    { title: 'Pasta Kochkurs', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800' },
    { title: 'Beachvolleyball', img: 'https://images.unsplash.com/photo-1593766788306-28561086694e?q=80&w=800' },
    { title: 'Spieleabend (Brettspiele)', img: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=800' },
    { title: 'Fotowalk City', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800' },
    { title: 'Tennis Match', img: 'https://images.unsplash.com/photo-1595435064219-cdd8ed129fe4?q=80&w=800' },
    { title: 'Lauftreff am See', img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800' },
    { title: 'Pub Quiz Abend', img: 'https://images.unsplash.com/photo-1597075484447-e50b9bb0ce8a?q=80&w=800' },
    { title: 'MTB Tour', img: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=800' },
    { title: 'Fussball Match', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800' },
    { title: 'Kino Abend', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800' },
    { title: 'Schach im Freien', img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=800' },
    { title: 'Pizza & Chill', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800' },
    { title: 'Fitness Workout', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800' },
    { title: 'Vernissage', img: 'https://images.unsplash.com/photo-1531050171652-597462c8ef22?q=80&w=800' }
];

const locations = [
    { name: 'Winterthur Altstadt', lat: 47.4990, lng: 8.7290 },
    { name: 'Winterthur Seen', lat: 47.4880, lng: 8.7550 },
    { name: 'Oberwinterthur', lat: 47.5120, lng: 8.7520 },
    { name: 'Effretikon', lat: 47.4270, lng: 8.6870 },
    { name: 'Illnau', lat: 47.4080, lng: 8.7180 },
    { name: 'Frauenfeld', lat: 47.5560, lng: 8.8970 },
    { name: 'Dübendorf', lat: 47.3980, lng: 8.6180 },
    { name: 'Zürich Oerlikon', lat: 47.4110, lng: 8.5440 },
    { name: 'Zürich Enge', lat: 47.3630, lng: 8.5350 },
    { name: 'Schaffhausen', lat: 47.6960, lng: 8.6340 }
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

async function reseedActivities() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('vibematch');
        const activities = db.collection('activities');

        console.log('Clearing old activities...');
        await activities.deleteMany({});

        console.log('Generating 60 activities with correct images...');
        const newActivities = [];
        const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

        for (let i = 0; i < 60; i++) {
            const def = activityDefinitions[i % activityDefinitions.length];
            const loc = locations[Math.floor(Math.random() * locations.length)];
            const day = days[Math.floor(Math.random() * days.length)];
            const hour = Math.floor(Math.random() * 5) + 17;
            const maxParticipants = Math.floor(Math.random() * 10) + 4;
            
            const distance = calculateDistance(ZHAW_COORDS.lat, ZHAW_COORDS.lng, loc.lat, loc.lng);

            newActivities.push({
                title: def.title,
                location: loc.name,
                lat: loc.lat,
                lng: loc.lng,
                time: `${day}, ${hour}:00 Uhr`,
                participants: `0/${maxParticipants}`,
                image: def.img,
                distance: parseFloat(distance.toFixed(1)),
                joinedUsers: [],
                createdAt: new Date()
            });
        }

        await activities.insertMany(newActivities);
        console.log('Successfully re-seeded 60 activities with correct images.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

reseedActivities();
