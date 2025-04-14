"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TicketService_1 = __importDefault(require("../services/TicketService"));
class TicketController {
    // Create ticket
    async createTicket(req, res) {
        try {
            const { seat_number, price, show_id, orderInfo, status, user_id } = req.body;
            if (!seat_number || !price || !show_id || !orderInfo) {
                res.status(400).json({
                    message: "Seat number, price, show ID, and orderInfo are required",
                });
            }
            else {
                const ticket = await TicketService_1.default.createTicket(seat_number, price, show_id, orderInfo, status, user_id // có thể undefined, service sẽ mặc định là "pending"
                );
                res.status(201).json(ticket);
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Get ticket by ID
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
    // Update ticket
    async updateTicket(req, res) {
        try {
            const { id } = req.params;
            const { seat_number, price, show_id, orderInfo, status } = req.body;
            const ticket = await TicketService_1.default.updateTicket(Number(id), seat_number, price, show_id, orderInfo, status);
            res.status(200).json(ticket);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Delete ticket
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
    async getAllTickets(req, res) {
        try {
            const tickets = await TicketService_1.default.getAllTickets();
            res.status(200).json(tickets);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getTicketsByShowId(req, res) {
        try {
            const { show_id } = req.params;
            const tickets = await TicketService_1.default.getTicketsByShowId(Number(show_id));
            res.status(200).json(tickets);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = new TicketController();
