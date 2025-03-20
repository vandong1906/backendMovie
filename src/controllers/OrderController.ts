// controllers/OrderController.ts
import { Request, Response } from "express";
import OrderService from "../services/OrderService";

class OrderController {
    // Create a new order
    async createOrder(req: Request, res: Response) {
        try {
            const { khachHang_id, tickets } = req.body; // tickets: [{ show_id, seat_number, price }]
            if (!tickets || !Array.isArray(tickets)) {
                res.status(400).json({ message: "Tickets are required and must be an array" });
            }

            const result = await OrderService.createOrder(khachHang_id || null, tickets);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get order details
    async getOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await OrderService.getOrderById(Number(id));
            res.status(200).json(order);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update order status
    async updateOrderStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!["pending", "paid", "shipped", "delivered", "cancelled"].includes(status)) {
                res.status(400).json({ message: "Invalid status" });
            }

            const order = await OrderService.updateOrderStatus(Number(id), status);
            res.status(200).json(order);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new OrderController();