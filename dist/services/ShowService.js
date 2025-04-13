"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/ShowService.ts
const Show_1 = __importDefault(require("../models/Show"));
const Movie_1 = __importDefault(require("../models/Movie"));
const Theater_1 = __importDefault(require("../models/Theater"));
const ticket_1 = __importDefault(require("../models/ticket"));
class ShowService {
    // Create a new show
    async createShow(show_time, movie_id, theater_id) {
        const movie = await Movie_1.default.findByPk(movie_id);
        if (!movie)
            throw new Error("Movie not found");
        const theater = await Theater_1.default.findByPk(theater_id);
        if (!theater)
            throw new Error("Theater not found");
        const show = await Show_1.default.create({ show_time, movie_id, theater_id });
        return show;
    }
    async getAllShows() {
        const shows = await Show_1.default.findAll({
            include: [{ model: ticket_1.default, as: "tickets" }],
        });
        if (!shows)
            throw new Error("No shows found");
        return shows;
    }
    // Get show by ID
    async getShowById(show_id) {
        const show = await Show_1.default.findByPk(show_id, {
            include: [
                { model: Movie_1.default, as: "movie" },
                { model: Theater_1.default, as: "theater" },
                { model: ticket_1.default, as: "tickets" },
            ],
        });
        if (!show)
            throw new Error("Show not found");
        return show;
    }
    // Update show
    async updateShow(show_id, show_time, movie_id, theater_id) {
        const show = await Show_1.default.findByPk(show_id);
        if (!show)
            throw new Error("Show not found");
        if (show_time)
            show.show_time = show_time;
        if (movie_id) {
            const movie = await Movie_1.default.findByPk(movie_id);
            if (!movie)
                throw new Error("Movie not found");
            show.movie_id = movie_id;
        }
        if (theater_id) {
            const theater = await Theater_1.default.findByPk(theater_id);
            if (!theater)
                throw new Error("Theater not found");
            show.theater_id = theater_id;
        }
        await show.save();
        return show;
    }
    // Delete show
    async deleteShow(show_id) {
        const show = await Show_1.default.findByPk(show_id);
        if (!show)
            throw new Error("Show not found");
        await show.destroy();
        return { message: "Show deleted successfully" };
    }
}
exports.default = new ShowService();
