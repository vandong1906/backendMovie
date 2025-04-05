"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderService_1 = __importDefault(require("../services/OrderService"));
class OrderController {
    // Create a new order
    async createOrder(req, res) {
        try {
            const { khachHang_id, tickets } = req.body; // tickets: [{ show_id, seat_number, price }]
            if (!tickets || !Array.isArray(tickets)) {
                res.status(400).json({ message: "Tickets are required and must be an array" });
            }
            const result = await OrderService_1.default.createOrder(khachHang_id || null, tickets);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllOrders(req, res) {
        try {
            const orders = await OrderService_1.default.getAllOrders();
            res.status(200).json(orders);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Get order details
    async getOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderService_1.default.getOrderById(Number(id));
            res.status(200).json(order);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Update order status
    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!["pending", "paid", "shipped", "delivered", "cancelled"].includes(status)) {
                res.status(400).json({ message: "Invalid status" });
            }
            const order = await OrderService_1.default.updateOrderStatus(Number(id), status);
            res.status(200).json(order);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = new OrderController();
