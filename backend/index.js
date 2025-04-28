const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/roads', async (req, res) => {
  const snapshot = await db.collection('roads').get();
  const roads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(roads);
});

app.post('/roads', async (req, res) => {
  const { name, type, path } = req.body;
  const docRef = await db.collection('roads').add({ name, type, path });
  res.json({ id: docRef.id });
});

app.delete('/roads/:id', async (req, res) => {
  await db.collection('roads').doc(req.params.id).delete();
  res.send('Deleted successfully');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
