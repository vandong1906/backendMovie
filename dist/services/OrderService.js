"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/OrderService.ts
const Order_1 = __importDefault(require("../models/Order"));
const ticket_1 = __importDefault(require("../models/ticket"));
const payment_1 = __importDefault(require("../models/payment"));
const Show_1 = __importDefault(require("../models/Show"));
class OrderService {
    // Create a new order with tickets
    async createOrder(User_id, ticketData) {
        // Calculate total amount from tickets
        const total_amount = ticketData.reduce((sum, ticket) => sum + ticket.price, 0);
        // Create the order
        const order = await Order_1.default.create({
            orderInfo: `Order for user ${User_id}`,
            total_amount,
            status: "pending",
        });
        const tickets = await Promise.all(ticketData.map((ticket) => ticket_1.default.create({
            show_id: ticket.show_id,
            seat_number: ticket.seat_number,
            price: ticket.price,
        })));
        return { order, tickets };
    }
    // Get all orders
    async getAllOrders() {
        const orders = await Order_1.default.findAll({
            include: [
                { model: ticket_1.default, as: "tickets", include: [{ model: Show_1.default, as: "show" }] },
                { model: payment_1.default, as: "payments" }, // Sửa alias từ "payment" thành "payments"
            ],
        });
        return orders;
    }
    // Get order details by ID
    async getOrderById(orderId) {
        const order = await Order_1.default.findByPk(orderId, {
            include: [
                { model: ticket_1.default, as: "tickets", include: [{ model: Show_1.default, as: "show" }] },
                { model: payment_1.default, as: "payments" }, // Sửa alias từ "payment" thành "payments"
            ],
        });
        if (!order)
            throw new Error("Order not found");
        return order;
    }
    // Update order status
    async updateOrderStatus(orderId, status) {
        const order = await Order_1.default.findByPk(orderId);
        if (!order)
            throw new Error("Order not found");
        order.status = status;
        await order.save();
        return order;
    }
}
exports.default = new OrderService();
