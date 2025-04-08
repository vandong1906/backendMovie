// app.ts
import express from "express";
import userRoutes from "./routes/userRoutes";
import movieRoutes from "./routes/movieRoutes";
import theaterRoutes from "./routes/theaterRoutes";
import showRoutes from "./routes/showRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import orderRoutes from "./routes/orderRoutes";
import payments from "./routes/paymentRoutes";
import sequelize from "./config/db";
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: ['http://localhost:3000','http://localhost:3001', 'http://localhost:5173','http://localhost:5500','https://movie-vandjngs-projects.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'],
        exposedHeaders: ['sessionId'],
      
        credentials: true,
        preflightContinue: false,
    }));
sequelize.sync();
console.log(new Date())
app.use('/api/payments', payments)
app.use("/api/admins", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/orders", orderRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


