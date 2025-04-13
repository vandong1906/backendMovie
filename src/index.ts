// app.ts
import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import movieRoutes from "./routes/movieRoutes";
import theaterRoutes from "./routes/theaterRoutes";
import showRoutes from "./routes/showRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import payments from "./routes/paymentRoutes";
import sequelize from "./config/db";

import cors from 'cors';
import  dotenv from "dotenv";
import { DATE } from "sequelize";
import setupAssociations from "./models/associations";
dotenv.config({ path: './.env' });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = JSON.parse(process.env.API_ORIGINS || '[]');


app.use(cors(
    {
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'],
        exposedHeaders: ['sessionId'],
        credentials: true,
        preflightContinue: false,
    }));
sequelize.sync();
setupAssociations()
app.use('/api/payments', payments)
app.use("/api/admins", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


