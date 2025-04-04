"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TicketService_1 = __importDefault(require("../services/TicketService"));
class TicketController {
    async createTicket(req, res) {
        try {
            const { seat_number, price, show_id } = req.body;
            if (!seat_number || !price || !show_id) {
                res.status(400).json({ message: "Seat number, price, and show ID are required" });
            }
            const ticket = await TicketService_1.default.createTicket(seat_number, price, show_id);
            res.status(201).json(ticket);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getTicket(req, res) {
        try {
            const { id } = req.params;
            const ticket = await TicketService_1.default.getTicketById(Number(id));
            res.status(200).json(ticket);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateTicket(req, res) {
        try {
            const { id } = req.params;
            const { seat_number, price, show_id } = req.body;
            const ticket = await TicketService_1.default.updateTicket(Number(id), seat_number, price, show_id);
            res.status(200).json(ticket);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteTicket(req, res) {
        try {
            const { id } = req.params;
            const result = await TicketService_1.default.deleteTicket(Number(id));
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = new TicketController();
