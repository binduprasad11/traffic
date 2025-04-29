const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Optional: Load Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Sample route
app.get("/", (req, res) => {
  res.send("Mysuru Traffic Backend is running");
});

// Example: Get all traffic data
app.get("/traffic", async (req, res) => {
  try {
    const snapshot = await db.collection("traffic").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).send("Error retrieving data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
