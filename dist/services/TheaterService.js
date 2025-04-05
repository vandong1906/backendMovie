"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/TheaterService.ts
const Theater_1 = __importDefault(require("../models/Theater"));
class TheaterService {
    // Create a new theater
    async createTheater(theater_name, location) {
        const theater = await Theater_1.default.create({ theater_name, location });
        return theater;
    }
    // Get theater by ID
    async getTheaterById(theater_id) {
        const theater = await Theater_1.default.findByPk(theater_id);
        if (!theater)
            throw new Error("Theater not found");
        return theater;
    }
    async getTheaterALl() {
        const theater = await Theater_1.default.findAll();
        if (!theater)
            throw new Error("Theater not found");
        return theater;
    }
    // Update theater
    async updateTheater(theater_id, theater_name, location) {
        const theater = await Theater_1.default.findByPk(theater_id);
        if (!theater)
            throw new Error("Theater not found");
        if (theater_name)
            theater.theater_name = theater_name;
        if (location)
            theater.location = location;
        await theater.save();
        return theater;
    }
    async deleteTheater(theater_id) {
        const theater = await Theater_1.default.findByPk(theater_id);
        if (!theater)
            throw new Error("Theater not found");
        await theater.destroy();
        return { message: "Theater deleted successfully" };
    }
}
exports.default = new TheaterService();
