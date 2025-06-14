const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./path-to-your-firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    const event = req.body;

    // Simplify event data for Firestore
    let eventType = 'unknown';
    let repoName = event.repository?.name || 'unknown';
    let actor = event.sender?.login || 'unknown';
    let timestamp = new Date().toISOString();

    if (event.action === 'created' && event.starred_at) {
      eventType = 'star';
      timestamp = event.starred_at;
    } else if (event.issue) {
      eventType = 'issue';
      timestamp = new Date().toISOString();
    } else if (event.commits) {
      eventType = 'push';
      timestamp = event.commits[0]?.timestamp || timestamp;
      actor = event.commits[0]?.author?.name || actor;
    }

    // Save event to Firestore
    await db.collection('githubEvents').add({
      eventType,
      repoName,
      actor,
      timestamp,
    });

    res.status(200).send('Event received and saved!');
  } catch (err) {
    console.error('Error saving event:', err);
    res.status(500).send('Server error');
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
