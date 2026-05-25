import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
}

const ZHAW_COORDS = { lat: 47.5020, lng: 8.7250 };

const hobbiesPool = [
    { name: 'Badminton', category: 'Sport', titles: ['Badminton Match', 'Federball im Park', 'Abend-Badminton'], images: ['https://images.unsplash.com/photo-1626225967045-94403165b497'] },
    { name: 'Bowling', category: 'Sport', titles: ['Bowling Night', 'Strike Challenge', 'Bowling & Pizza'], images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8'] },
    { name: 'Wandern', category: 'Sport', titles: ['Bergwanderung', 'Naturspaziergang', 'Uetliberg Tour'], images: ['https://images.unsplash.com/photo-1551632811-561732d1e306'] },
    { name: 'Yoga', category: 'Sport', titles: ['Yoga im Park', 'Morning Flow', 'Entspannungs-Yoga'], images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'] },
    { name: 'Fussball', category: 'Sport', titles: ['Kick it like Beckham', 'Fussball Match', 'Fussball Turnier'], images: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018'] },
    { name: 'Klettern', category: 'Sport', titles: ['Bouldern Session', 'Kletterhalle', 'Outdoor Klettern'], images: ['https://images.unsplash.com/photo-1522163182402-834f871fd851'] },
    { name: 'Schwimmen', category: 'Sport', titles: ['Abkühlung im See', 'Bahnen ziehen', 'Aare Schwimmen'], images: ['https://images.unsplash.com/photo-1519315901367-f34ff9154487'] },
    { name: 'Kochen', category: 'Kulinarik', titles: ['Pasta Kurs', 'Sushi Night', 'Indisch Kochen'], images: ['https://images.unsplash.com/photo-1551183053-bf91a1d81141'] },
    { name: 'Ausgehen', category: 'Kulinarik', titles: ['Cocktail Night', 'Afterwork Drinks', 'Weinverkostung'], images: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b'] },
    { name: 'Gaming', category: 'Freizeit', titles: ['Boardgame Night', 'Mario Kart Turnier', 'Gaming Session'], images: ['https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09'] },
    { name: 'Fotografie', category: 'Stadtbetrachten', titles: ['Fotowalk City', 'Golden Hour Shooting', 'Street Photography'], images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32'] },
    { name: 'Museum', category: 'Stadtbetrachten', titles: ['Kunsthaus Besuch', 'Landesmuseum Tour', 'Technorama Trip'], images: ['https://images.unsplash.com/photo-1554907984-15263bfd63bd'] },
    { name: 'Konzerte', category: 'Musik', titles: ['Jazz Night', 'Open Air Konzert', 'Live Band im Pub'], images: ['https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f'] },
    { name: 'Karaoke', category: 'Musik', titles: ['Karaoke Party', 'Sing your Heart out', 'Karaoke Bar'], images: ['https://images.unsplash.com/photo-1520523839897-bd0b52f945a0'] }
];

const locations = [
    { name: 'Winterthur Archhöfe', lat: 47.4980, lng: 8.7240 },
    { name: 'Winterthur Stadtgarten', lat: 47.5010, lng: 8.7290 },
    { name: 'Winterthur Eulachpark', lat: 47.5080, lng: 8.7450 },
    { name: 'Winterthur Hauptbahnhof', lat: 47.5000, lng: 8.7230 },
    { name: 'Zürich HB', lat: 47.3769, lng: 8.5417 },
    { name: 'Zürich Hardplatz', lat: 47.3855, lng: 8.5175 },
    { name: 'Zürich Bellevue', lat: 47.3667, lng: 8.5450 },
    { name: 'Effretikon Bahnhof', lat: 47.4270, lng: 8.6870 },
    { name: 'Dübendorf', lat: 47.3980, lng: 8.6180 },
    { name: 'Frauenfeld Markt', lat: 47.5560, lng: 8.8970 }
];

const times = [
    'Montag, 18:00 Uhr', 'Dienstag, 19:30 Uhr', 'Mittwoch, 20:00 Uhr', 
    'Donnerstag, 18:45 Uhr', 'Freitag, 21:00 Uhr', 'Samstag, 10:00 Uhr', 
    'Samstag, 14:00 Uhr', 'Samstag, 20:00 Uhr', 'Sonntag, 09:30 Uhr', 'Sonntag, 15:00 Uhr'
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

async function seedActivities() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('vibematch');
        const activities = db.collection('activities');

        console.log('Clearing existing activities...');
        await activities.deleteMany({});

        console.log('Generating 50 test activities...');
        const activitiesToInsert = [];

        for (let i = 0; i < 50; i++) {
            const hobby = hobbiesPool[Math.floor(Math.random() * hobbiesPool.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const time = times[Math.floor(Math.random() * times.length)];
            const title = hobby.titles[Math.floor(Math.random() * hobby.titles.length)];
            const image = hobby.images[0] + '?auto=format&fit=crop&q=80&w=800';
            
            const maxParticipants = Math.floor(Math.random() * 12) + 4;
            const distance = calculateDistance(ZHAW_COORDS.lat, ZHAW_COORDS.lng, location.lat, location.lng);

            activitiesToInsert.push({
                title: `${title} @ ${location.name.split(' ')[0]}`,
                location: location.name,
                lat: location.lat,
                lng: location.lng,
                time,
                participants: `0/${maxParticipants}`,
                image,
                category: hobby.category,
                hobby: hobby.name,
                distance: parseFloat(distance.toFixed(1)),
                joinedUsers: [],
                createdAt: new Date()
            });
        }

        const result = await activities.insertMany(activitiesToInsert);
        console.log(`Successfully inserted ${result.insertedCount} activities.`);

    } catch (error) {
        console.error('Error seeding activities:', error);
    } finally {
        await client.close();
    }
}

seedActivities();
