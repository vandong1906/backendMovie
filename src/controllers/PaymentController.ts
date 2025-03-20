// controllers/PaymentController.ts
import { Request, Response } from "express";
import PaymentService from "../services/PaymentService";

class PaymentController {
    // Create a payment for an order
    async createPayment(req: Request, res: Response) {
        try {
            const { order_id, amount, payment_method, transaction_id } = req.body;
            if (!order_id || !amount || !payment_method) {
                res.status(400).json({ message: "Order ID, amount, and payment method are required" });
            }
            if (!["credit_card", "debit_card", "paypal", "cash"].includes(payment_method)) {
                res.status(400).json({ message: "Invalid payment method" });
            }

            const payment = await PaymentService.createPayment(order_id, amount, payment_method, transaction_id);
            res.status(201).json(payment);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update payment status
    async updatePaymentStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { payment_status } = req.body;
            if (!["pending", "completed", "failed"].includes(payment_status)) {
                res.status(400).json({ message: "Invalid payment status" });
            }

            const payment = await PaymentService.updatePaymentStatus(Number(id), payment_status);
            res.status(200).json(payment);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get payment details by order ID
    async getPaymentByOrderId(req: Request, res: Response) {
        try {
            const { orderId } = req.params;
            const payment = await PaymentService.getPaymentByOrderId(Number(orderId));
            res.status(200).json(payment);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new PaymentController();