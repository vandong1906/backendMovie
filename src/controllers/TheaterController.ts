// controllers/TheaterController.ts
import { Request, Response } from "express";
import TheaterService from "../services/TheaterService";

class TheaterController {
    async createTheater(req: Request, res: Response) {
        try {
            const { theater_name, location } = req.body;
            if (!theater_name || !location) {
                 res.status(400).json({ message: "Theater name and location are required" });
            }

            const theater = await TheaterService.createTheater(theater_name, location);
             res.status(201).json(theater);
        } catch (error: any) {
             res.status(500).json({ message: error.message });
        }
    }

    async getAllTheater(req: Request, res: Response) {
        try {
            const theaters = await TheaterService.getTheaterALl();
             res.status(200).json(theaters);
        } catch (error: any) {
             res.status(500).json({ message: error.message });
        }
    }
    async getTheater(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const theater = await TheaterService.getTheaterById(Number(id));
             res.status(200).json(theater);
        } catch (error: any) {
             res.status(500).json({ message: error.message });
        }
    }

    async updateTheater(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { theater_name, location } = req.body;
            const theater = await TheaterService.updateTheater(Number(id), theater_name, location);
             res.status(200).json(theater);
        } catch (error: any) {
             res.status(500).json({ message: error.message });
        }
    }

    async deleteTheater(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await TheaterService.deleteTheater(Number(id));
             res.status(200).json(result);
        } catch (error: any) {
             res.status(500).json({ message: error.message });
        }
    }
}

export default new TheaterController();