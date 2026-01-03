import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://contact-form-u2xv.onrender.com",
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.use('/api/contacts', contactRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
