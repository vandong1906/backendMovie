// services/ShowService.ts
import Show from "../models/Show";
import Movie from "../models/Movie";
import Theater from "../models/Theater";
import Ticket from "../models/ticket";

class ShowService {
    // Create a new show
    async createShow(show_time: Date, movie_id: number, theater_id: number) {
        const movie = await Movie.findByPk(movie_id);
        if (!movie) throw new Error("Movie not found");

        const theater = await Theater.findByPk(theater_id);
        if (!theater) throw new Error("Theater not found");

        const show = await Show.create({ show_time, movie_id, theater_id });
        return show;
    }

    // Get show by ID
    async getShowById(show_id: number) {
        const show = await Show.findByPk(show_id, {
            include: [
                { model: Movie, as: "movie" },
                { model: Theater, as: "theater" },
                { model: Ticket, as: "tickets" },
            ],
        });
        if (!show) throw new Error("Show not found");
        return show;
    }

    // Update show
    async updateShow(show_id: number, show_time?: Date, movie_id?: number, theater_id?: number) {
        const show = await Show.findByPk(show_id);
        if (!show) throw new Error("Show not found");

        if (show_time) show.show_time = show_time;
        if (movie_id) {
            const movie = await Movie.findByPk(movie_id);
            if (!movie) throw new Error("Movie not found");
            show.movie_id = movie_id;
        }
        if (theater_id) {
            const theater = await Theater.findByPk(theater_id);
            if (!theater) throw new Error("Theater not found");
            show.theater_id = theater_id;
        }
        await show.save();
        return show;
    }

    // Delete show
    async deleteShow(show_id: number) {
        const show = await Show.findByPk(show_id);
        if (!show) throw new Error("Show not found");

        await show.destroy();
        return { message: "Show deleted successfully" };
    }
}

export default new ShowService();