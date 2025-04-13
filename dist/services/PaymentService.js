"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/PaymentService.ts
const payment_1 = __importDefault(require("../models/payment"));
const ticket_1 = __importDefault(require("../models/ticket"));
class PaymentService {
    // Create a payment for an order
    async createPayment(ticket_id, amount, payment_method, transaction_id) {
        // Verify the order exists and the amount matches
        // const order = await Order.findByPk(order_id);
        // if (!order) {
        //     throw new Error("Order not found");
        // }
        // // Kiểm tra số tiền thanh toán
        // if (amount !== order.total_amount) {
        //     throw new Error("Payment amount does not match order total");
        // }
        // Create the payment
        const payment = await payment_1.default.create({
            ticket_id,
            amount,
            payment_method,
            payment_status: "pending",
            transaction_id,
        });
        return payment;
    }
    // Update payment status (e.g., after payment gateway callback)
    async updatePaymentStatus(paymentId, payment_status) {
        const payment = await payment_1.default.findByPk(paymentId);
        if (!payment)
            throw new Error("Payment not found");
        payment.payment_status = payment_status;
        await payment.save();
        // If payment is completed, update the order status
        if (payment_status === "completed") {
            const ticket = await ticket_1.default.findByPk(payment.ticket_id);
            if (ticket) {
                ticket.status = "paid";
                await ticket.save();
            }
        }
        return payment;
    }
    // Get payment details by order ID
    async getPaymentByOrderId(ticket_id) {
        const payment = await payment_1.default.findOne({
            where: { ticket_id: ticket_id },
            include: [{ model: ticket_1.default, as: "ticket" }],
        });
        if (!payment)
            throw new Error("Payment not found");
        return payment;
    }
}
exports.default = new PaymentService();
