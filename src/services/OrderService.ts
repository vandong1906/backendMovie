// services/OrderService.ts
import Order from "../models/Order";
import Ticket from "../models/ticket";
import Payment from "../models/payment";
import Show from "../models/Show";
import { Op } from "sequelize";

class OrderService {
    // Create a new order with tickets
    async createOrder(User_id: number | null, ticketData: { show_id: number; seat_number: string; price: number }[]) {
        // Calculate total amount from tickets
        const total_amount = ticketData.reduce((sum, ticket) => sum + ticket.price, 0);

        // Create the order
        const order = await Order.create({
         orderInfo: `Order for user ${User_id}`,
            total_amount,
            status: "pending",
        });

       
        const tickets = await Promise.all(
            ticketData.map((ticket) =>
                Ticket.create({
                    show_id: ticket.show_id,
                    seat_number: ticket.seat_number,
                    price: ticket.price,
                   
                })
            )
        );

        return { order, tickets };
    }

    // Get order details by ID
    async getOrderById(orderId: number) {
        const order = await Order.findByPk(orderId, {
            include: [
                { model: Ticket, as: "tickets", include: [{ model: Show, as: "show" }] },
                { model: Payment, as: "payments" }, // Sửa alias từ "payment" thành "payments"
            ],
        });
        if (!order) throw new Error("Order not found");
        return order;
    }

    // Update order status
    async updateOrderStatus(orderId: number, status: "pending" | "paid" | "shipped" | "delivered" | "cancelled") {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error("Order not found");

        order.status = status;
        await order.save();
        return order;
    }
}

export default new OrderService();