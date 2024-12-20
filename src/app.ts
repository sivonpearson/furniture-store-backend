import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_URI = 'mongodb://localhost:27017'; // connection string for db

// MongoDB Connection
mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

export default app;