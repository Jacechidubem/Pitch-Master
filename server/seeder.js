const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Player = require('./models/Player');
const Coach = require('./models/coach'); // New
const players = require('./data/players');
const coaches = require('./data/coaches'); // New

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Player.deleteMany();
    await Coach.deleteMany(); // Clear coaches too

    await Player.insertMany(players);
    await Coach.insertMany(coaches);

    console.log('✅ Players & Coaches Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // Destroy logic (omitted for brevity)
} else {
  importData();
}