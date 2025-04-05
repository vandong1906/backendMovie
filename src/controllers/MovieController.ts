    // controllers/MovieController.ts
import { Request, Response } from "express";
import MovieService from "../services/MovieService";

class MovieController {
    async createMovie(req: Request, res: Response) {
        try {
            if (req.file) {
                const { path } = req.file;
                console.log(req.body);
                const { movie_name, genre, duration } = req.body;
                if (!movie_name || !genre || !duration) {
                     res.status(400).json({ message: "Movie name, genre, and duration are required" });
                }
    
                const movie = await MovieService.createMovie(movie_name, genre, duration,path);
             res.json(movie).status(201);
            }
            else {
                res.status(400).json({ message: "No file uploaded" });
            }
          
           
        } catch (error: any) {
             res.status(500).json({ message: error.message });
        }
    }

    async getMovie(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const movie = await MovieService.getMovieById(Number(id));
   
            res.status(200).json(movie);
        } catch (error: any) {
             res.status(500).json({ message: error.message });
        }
    }

    async updateMovie(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { movie_name, genre, duration } = req.body;
            const movie = await MovieService.updateMovie(Number(id), movie_name, genre, duration);
             res.status(200).json(movie);
        } catch (error: any) {
             res.status(500).json({ message: error.message });
        }
    }

    async deleteMovie(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await MovieService.deleteMovie(Number(id));
             res.status(200).json(result);
        } catch (error: any) {
             res.status(500).json({ message: error.message });
        }
    }
}

export default new MovieController();