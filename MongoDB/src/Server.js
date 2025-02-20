const express = require('express');
const { connectToDB, client } = require('./Db');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
const dbName = "Verification";
const collectionName = "VC0";

app.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "Missing required fields: Email or Password" });
    }

    let db = client.db(dbName);
    let collection = db.collection(collectionName);
    const user = await collection.findOne({ Email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (isPasswordValid) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

app.post('/store-data', async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;

    if (!Username || !Email || !Password) {
      return res.status(400).json({ message: "Missing required fields: Username, Email, or Password" });
    }

    let db = client.db(dbName);
    let collection = db.collection(collectionName);

    const existingUsername = await collection.findOne({ Username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already taken." });
    }

    const existingEmail = await collection.findOne({ Email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email ID already exists." });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const dataToInsert = {
      Username,
      Email,
      Password: hashedPassword
    };

    const result = await collection.insertOne(dataToInsert);
    res.status(201).json({ message: "Registration successful", insertedId: result.insertedId });

  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

app.listen(port, async () => {
  try {
    await connectToDB();
    console.log(`Server running at http://localhost:${port}`);
  } catch (err) {
    console.error("Failed to start server due to MongoDB error:", err);
  }
});