// services/PaymentService.ts
import Payment from "../models/payment";
import Ticket from "../models/ticket";


class PaymentService {
    // Create a payment for an order
    async createPayment(
        ticket_id: number,
        amount: number,
        payment_method: "credit_card" | "debit_card" | "paypal" | "cash",
        transaction_id?: string
    ) {
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
        const payment = await Payment.create({
            ticket_id,
            amount,
            payment_method,
            payment_status: "pending",
            transaction_id,
        });

        return payment;
    }

    // Update payment status (e.g., after payment gateway callback)
    async updatePaymentStatus(paymentId: number, payment_status: "pending" | "completed" | "failed") {
        const payment = await Payment.findByPk(paymentId);
        if (!payment) throw new Error("Payment not found");

        payment.payment_status = payment_status;
        await payment.save();

        // If payment is completed, update the order status
        if (payment_status === "completed") {
            const ticket = await Ticket.findByPk(payment.ticket_id);
            if (ticket) {
                ticket.status = "paid";
                await ticket.save();
            }
        }

        return payment;
    }

    // Get payment details by order ID
    async getPaymentByOrderId(ticket_id: number) {
        const payment = await Payment.findOne({
            where: { ticket_id: ticket_id },
            include: [{ model: Ticket, as: "ticket" }],
        });
        if (!payment) throw new Error("Payment not found");
        return payment;
    }
}

export default new PaymentService();