"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/MovieService.ts
const Movie_1 = __importDefault(require("../models/Movie"));
const Show_1 = __importDefault(require("../models/Show"));
class MovieService {
    // Create a new movie
    async createMovie(movie_name, genre, duration, path) {
        const movie = await Movie_1.default.create({ movie_name, genre, duration, path });
        return movie;
    }
    // Get movie by ID
    async getMovieById(movie_id) {
        const movie = await Movie_1.default.findByPk(movie_id, {
            include: [{ model: Show_1.default, as: "shows" }],
        });
        if (!movie)
            throw new Error("Movie not found");
        return movie;
    }
    // Update movie
    async updateMovie(movie_id, movie_name, genre, duration, path) {
        console.log(movie_id, movie_name, genre, duration, path);
        const movie = await Movie_1.default.update({ movie_name, genre, duration, path }, { where: { movie_id } });
        console.log(movie);
        return movie;
    }
    // Delete movie
    async deleteMovie(movie_id) {
        const movie = await Movie_1.default.findByPk(movie_id);
        if (!movie)
            throw new Error("Movie not found");
        await movie.destroy();
        return { message: "Movie deleted successfully" };
    }
    async getAllMovies() {
        const movies = await Movie_1.default.findAll({
            include: [{ model: Show_1.default, as: "shows" }],
        });
        return movies;
    }
}
exports.default = new MovieService();
