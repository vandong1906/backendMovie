// controllers/ShowController.ts
import { Request, Response } from "express";
import ShowService from "../services/ShowService";

class ShowController {
    async createShow(req: Request, res: Response) {
        try {
            const { show_time, movie_id, theater_id } = req.body;
            if (!show_time || !movie_id || !theater_id) {
                res.status(400).json({ message: "Show time, movie ID, and theater ID are required" });
            }
            else {

                const show = await ShowService.createShow(new Date(show_time), movie_id, theater_id);
                res.status(201).json(show);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
async getAllShows(req: Request, res: Response) {
        try {
            const shows = await ShowService.getAllShows();
            res.status(200).json(shows);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    async getShow(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const show = await ShowService.getShowById(Number(id));
            res.status(200).json(show);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateShow(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { show_time, movie_id, theater_id } = req.body;
            const show = await ShowService.updateShow(
                Number(id),
                show_time ? new Date(show_time) : undefined,
                movie_id,
                theater_id
            );
            res.status(200).json(show);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteShow(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await ShowService.deleteShow(Number(id));
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ShowController();