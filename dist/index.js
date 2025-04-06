"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const theaterRoutes_1 = __importDefault(require("./routes/theaterRoutes"));
const showRoutes_1 = __importDefault(require("./routes/showRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5500,https://movie-murex-nine.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'],
    exposedHeaders: ['sessionId'],
    credentials: true,
    preflightContinue: false,
}));
db_1.default.sync();
app.use('/api/payments', paymentRoutes_1.default);
app.use("/api/admins", userRoutes_1.default);
app.use("/api/movies", movieRoutes_1.default);
app.use("/api/theaters", theaterRoutes_1.default);
app.use("/api/shows", showRoutes_1.default);
app.use("/api/tickets", ticketRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
