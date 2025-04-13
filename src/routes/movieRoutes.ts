// routes/movieRoutes.ts
import { Router } from "express";
import MovieController from "../controllers/MovieController";
import { uploadConfigs } from "../utils/upload";
import {authMiddleware, isAdmin} from "../utils/authenciacne";

const router = Router();

router.route('/:id')
    .put([authMiddleware, isAdmin, uploadConfigs.movie], MovieController.updateMovie)
    .delete([authMiddleware, isAdmin], MovieController.deleteMovie);

router.route('/')
    .post([authMiddleware, isAdmin, uploadConfigs.movie], MovieController.createMovie);

router.get('/:id', MovieController.getMovie);        
router.get('/', MovieController.getAllMovies);
export default router;  