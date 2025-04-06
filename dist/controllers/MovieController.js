"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieService_1 = __importDefault(require("../services/MovieService"));
class MovieController {
    async createMovie(req, res) {
        try {
            if (req.file) {
                const { path } = req.file;
                console.log(req.body);
                const { movie_name, genre, duration } = req.body;
                if (!movie_name || !genre || !duration) {
                    res.status(400).json({ message: "Movie name, genre, and duration are required" });
                }
                const movie = await MovieService_1.default.createMovie(movie_name, genre, duration, path);
                res.json(movie).status(201);
            }
            else {
                res.status(400).json({ message: "No file uploaded" });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getMovie(req, res) {
        try {
            const { id } = req.params;
            const movie = await MovieService_1.default.getMovieById(Number(id));
            res.status(200).json(movie);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateMovie(req, res) {
        try {
            const { id } = req.params;
            const { movie_name, genre, duration } = req.body;
            if (req.file) {
                const path = req.file.path;
                if (!id) {
                    res.status(400).json({ message: "Movie ID is required" });
                }
                if (!movie_name && !genre && !duration && !path) {
                    res.status(400).json({ message: "No fields to update" });
                }
                const movie = await MovieService_1.default.updateMovie(Number(id), movie_name, genre, duration, path);
                res.status(200).json(movie);
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteMovie(req, res) {
        try {
            const { id } = req.params;
            const result = await MovieService_1.default.deleteMovie(Number(id));
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllMovies(req, res) {
        try {
            const movies = await MovieService_1.default.getAllMovies();
            res.status(200).json(movies);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = new MovieController();
