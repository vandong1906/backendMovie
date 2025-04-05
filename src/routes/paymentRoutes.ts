// routes/paymentRoutes.ts
import express, { Request, Response } from 'express';
import PaymentController from "../controllers/PaymentController";
import { vnp_Url, vnp_ReturnUrl, vnp_TmnCode, vnp_HashSecret } from '../config/vnpay-config';
const router = express.Router();

router.post("/", PaymentController.createPayment);
router.put("/:id/status", PaymentController.updatePaymentStatus);
router.get("/order/:orderId", PaymentController.getPaymentByOrderId);

router.get('/payment-result',PaymentController.paymentResult);


export default router;