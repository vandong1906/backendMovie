// services/TheaterService.ts
import Theater from "../models/Theater";
import Show from "../models/Show";

class TheaterService {
    // Create a new theater
    async createTheater(theater_name: string, location: string) {
        const theater = await Theater.create({ theater_name, location });
        return theater;
    }

    // Get theater by ID
    async getTheaterById(theater_id: number) {
        const theater = await Theater.findByPk(theater_id, {
            include: [{ model: Show, as: "shows" }],
        });
        if (!theater) throw new Error("Theater not found");
        return theater;
    }

    // Update theater
    async updateTheater(theater_id: number, theater_name?: string, location?: string) {
        const theater = await Theater.findByPk(theater_id);
        if (!theater) throw new Error("Theater not found");

        if (theater_name) theater.theater_name = theater_name;
        if (location) theater.location = location;
        await theater.save();
        return theater;
    }
    async deleteTheater(theater_id: number) {
        const theater = await Theater.findByPk(theater_id);
        if (!theater) throw new Error("Theater not found");

        await theater.destroy();
        return { message: "Theater deleted successfully" };
    }
}

export default new TheaterService();