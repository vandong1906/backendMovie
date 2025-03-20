// controllers/TicketController.ts
import { Request, Response } from "express";
import TicketService from "../services/TicketService";

class TicketController {
    async createTicket(req: Request, res: Response) {
        try {
            const { seat_number, price, show_id } = req.body;
            if (!seat_number || !price || !show_id) {
                res.status(400).json({ message: "Seat number, price, and show ID are required" });
            }

            const ticket = await TicketService.createTicket(seat_number, price, show_id);
            res.status(201).json(ticket);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTicket(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const ticket = await TicketService.getTicketById(Number(id));
            res.status(200).json(ticket);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateTicket(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { seat_number, price, show_id } = req.body;
            const ticket = await TicketService.updateTicket(Number(id), seat_number, price, show_id);
            res.status(200).json(ticket);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteTicket(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await TicketService.deleteTicket(Number(id));
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new TicketController();