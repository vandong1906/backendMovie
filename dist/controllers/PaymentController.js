"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentService_1 = __importDefault(require("../services/PaymentService"));
class PaymentController {
    // Create a payment for an order
    async createPayment(req, res) {
        try {
            const { order_id, amount, payment_method, transaction_id } = req.body;
            if (!order_id || !amount || !payment_method) {
                res.status(400).json({ message: "Order ID, amount, and payment method are required" });
            }
            if (!["credit_card", "debit_card", "paypal", "cash"].includes(payment_method)) {
                res.status(400).json({ message: "Invalid payment method" });
            }
            const payment = await PaymentService_1.default.createPayment(order_id, amount, payment_method, transaction_id);
            res.status(201).json(payment);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Update payment status
    async updatePaymentStatus(req, res) {
        try {
            const { id } = req.params;
            const { payment_status } = req.body;
            if (!["pending", "completed", "failed"].includes(payment_status)) {
                res.status(400).json({ message: "Invalid payment status" });
            }
            const payment = await PaymentService_1.default.updatePaymentStatus(Number(id), payment_status);
            res.status(200).json(payment);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Get payment details by order ID
    async getPaymentByOrderId(req, res) {
        try {
            const { orderId } = req.params;
            const payment = await PaymentService_1.default.getPaymentByOrderId(Number(orderId));
            res.status(200).json(payment);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = new PaymentController();
