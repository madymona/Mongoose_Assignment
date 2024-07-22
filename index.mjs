import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import gradesRouter from './routes/grades.mjs';

// env variables
dotenv.config();

// connect to MongoDb database
mongoose.connect(process.env.ATLAS_URI);

const app = express();
const PORT = process.env.PORT || 5700;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use("/grades", gradesRouter);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
