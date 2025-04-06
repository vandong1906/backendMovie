// routes/movieRoutes.ts
import { Router } from "express";
import MovieController from "../controllers/MovieController";
import { uploadConfigs } from "../utils/upload";

const router = Router();

router.post("/",uploadConfigs.movie,MovieController.createMovie);
router.get("/:id", MovieController.getMovie);
router.put("/:id", MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);
router.get("/", MovieController.getAllMovies);
export default router;