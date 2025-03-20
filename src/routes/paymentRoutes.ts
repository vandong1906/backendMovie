// routes/paymentRoutes.ts
import { Router } from "express";
import PaymentController from "../controllers/PaymentController";

const router = Router();

router.post("/", PaymentController.createPayment);
router.put("/:id/status", PaymentController.updatePaymentStatus);
router.get("/order/:orderId", PaymentController.getPaymentByOrderId);

export default router;