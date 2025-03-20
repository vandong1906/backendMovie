// routes/showRoutes.ts
import { Router } from "express";
import ShowController from "../controllers/ShowController";

const router = Router();

router.post("/", ShowController.createShow);
router.get("/:id", ShowController.getShow);
router.put("/:id", ShowController.updateShow);
router.delete("/:id", ShowController.deleteShow);

export default router;