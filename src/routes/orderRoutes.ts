// routes/orderRoutes.ts
import { Router } from "express";
import OrderController from "../controllers/OrderController";

const router = Router();

router.post("/", OrderController.createOrder);
router.get("/:id", OrderController.getOrder);
router.put("/:id/status", OrderController.updateOrderStatus);

export default router;