"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShowService_1 = __importDefault(require("../services/ShowService"));
class ShowController {
    async createShow(req, res) {
        try {
            const { show_time, movie_id, theater_id } = req.body;
            if (!show_time || !movie_id || !theater_id) {
                res.status(400).json({ message: "Show time, movie ID, and theater ID are required" });
            }
            const show = await ShowService_1.default.createShow(new Date(show_time), movie_id, theater_id);
            res.status(201).json(show);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getShow(req, res) {
        try {
            const { id } = req.params;
            const show = await ShowService_1.default.getShowById(Number(id));
            res.status(200).json(show);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateShow(req, res) {
        try {
            const { id } = req.params;
            const { show_time, movie_id, theater_id } = req.body;
            const show = await ShowService_1.default.updateShow(Number(id), show_time ? new Date(show_time) : undefined, movie_id, theater_id);
            res.status(200).json(show);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteShow(req, res) {
        try {
            const { id } = req.params;
            const result = await ShowService_1.default.deleteShow(Number(id));
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = new ShowController();
