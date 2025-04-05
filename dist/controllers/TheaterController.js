"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TheaterService_1 = __importDefault(require("../services/TheaterService"));
class TheaterController {
    async createTheater(req, res) {
        try {
            const { theater_name, location } = req.body;
            if (!theater_name || !location) {
                res.status(400).json({ message: "Theater name and location are required" });
            }
            const theater = await TheaterService_1.default.createTheater(theater_name, location);
            res.status(201).json(theater);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllTheater(req, res) {
        try {
            const theaters = await TheaterService_1.default.getTheaterALl();
            res.status(200).json(theaters);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getTheater(req, res) {
        try {
            const { id } = req.params;
            const theater = await TheaterService_1.default.getTheaterById(Number(id));
            res.status(200).json(theater);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateTheater(req, res) {
        try {
            const { id } = req.params;
            const { theater_name, location } = req.body;
            const theater = await TheaterService_1.default.updateTheater(Number(id), theater_name, location);
            res.status(200).json(theater);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteTheater(req, res) {
        try {
            const { id } = req.params;
            const result = await TheaterService_1.default.deleteTheater(Number(id));
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = new TheaterController();
