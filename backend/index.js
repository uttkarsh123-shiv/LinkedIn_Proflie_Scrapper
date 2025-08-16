const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: "*", // allow all origins (for development)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// SQLite setup
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "profiles.sqlite",
  logging: console.log, // shows SQL queries
});

// Define Profile model
const Profile = sequelize.define("Profile", {
  name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false, unique: true },
  about: { type: DataTypes.TEXT, defaultValue: "" },
  bio: { type: DataTypes.TEXT, defaultValue: "" },
  location: { type: DataTypes.STRING, defaultValue: "" },
  followerCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  connectionCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

// Sync database
sequelize.sync({ alter: true }) // updates table structure if changed
  .then(() => console.log("Database synced"))
  .catch(err => console.error("DB sync error:", err));

// POST /profiles - insert profile
app.post("/profiles", async (req, res) => {
  try {
    // Make sure numeric fields are numbers
    const data = {
      ...req.body,
      followerCount: Number(req.body.followerCount) || 0,
      connectionCount: Number(req.body.connectionCount) || 0,
    };
    const profile = await Profile.create(data);
    res.json(profile);
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /profiles - fetch all profiles
app.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
