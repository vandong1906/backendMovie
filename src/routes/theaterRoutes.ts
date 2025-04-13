// routes/theaterRoutes.ts
import { Router } from "express";
import TheaterController from "../controllers/TheaterController";
import {authMiddleware, isAdmin} from "../utils/authenciacne";

const router = Router();


router.route('/theaters/:id')
    .put([authMiddleware, isAdmin], TheaterController.updateTheater)
    .delete([authMiddleware, isAdmin], TheaterController.deleteTheater);
router.route('/')
  .post([authMiddleware, isAdmin], TheaterController.createTheater);


router.get('/:id', TheaterController.getTheater);         
router.get('/', TheaterController.getAllTheater);        

module.exports = router;
export default router;