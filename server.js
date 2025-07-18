const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student'); // make sure this file exists

const app = express();
dotenv.config();

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ Mongoose connection failed:");
    console.error(err);
  });

// POST: Add Student
app.post('/add-student', async (req, res) => {
  try {
    const { name, email, course } = req.body;

    // Basic validation
    if (!name || !email || !course) {
      return res.status(400).send("All fields are required");
    }

    const student = new Student({ name, email, course });
    await student.save();

    res.status(201).send("Student added successfully");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
