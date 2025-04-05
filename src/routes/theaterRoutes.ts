// routes/theaterRoutes.ts
import { Router } from "express";
import TheaterController from "../controllers/TheaterController";

const router = Router();

router.post("/", TheaterController.createTheater);
router.get("/:id", TheaterController.getTheater);
router.put("/:id", TheaterController.updateTheater);
router.delete("/:id", TheaterController.deleteTheater);
router.get("/", TheaterController.getAllTheater);
export default router;