// app.ts
import express from "express";
import userRoutes from "./routes/userRoutes";
import movieRoutes from "./routes/movieRoutes";
import theaterRoutes from "./routes/theaterRoutes";
import showRoutes from "./routes/showRoutes";
import ticketRoutes from "./routes/ticketRoutes";

const app = express();

app.use(express.json());

app.use("/api/admins", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});