// routes/showRoutes.ts
import { Router } from "express";
import ShowController from "../controllers/ShowController";
import {authMiddleware, isAdmin, refreshToken} from "../utils/authenciacne";
const router = Router();

router.route('/:id')
    .put([authMiddleware, isAdmin], ShowController.updateShow)
    .delete([authMiddleware, isAdmin], ShowController.deleteShow);
router.route('/')
  .post([authMiddleware, isAdmin] ,ShowController.createShow);

// Các route GET không cần authentication
router.get('/:id', ShowController.getShow);         
router.get('/', ShowController.getAllShows);       
export default router;