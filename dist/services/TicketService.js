"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_1 = __importDefault(require("../models/ticket"));
const Show_1 = __importDefault(require("../models/Show"));
class TicketService {
    // Create ticket
    async getAllTickets() {
        const tickets = await ticket_1.default.findAll({
            include: [{ model: Show_1.default, as: "show" }],
        });
        return tickets;
    }
    // Get all tickets by show ID
    async getTicketsByShowId(show_id) {
        const tickets = await ticket_1.default.findAll({
            where: { show_id },
            include: [{ model: Show_1.default, as: "show" }],
        });
        if (!tickets || tickets.length === 0)
            throw new Error("No tickets found for this show");
        return tickets;
    }
    async createTicket(seat_number, price, show_id, orderInfo, status = "pending", user_id) {
        const show = await Show_1.default.findByPk(show_id);
        if (!show)
            throw new Error("Show not found");
        const ticket = await ticket_1.default.create({
            seat_number,
            price,
            show_id,
            orderInfo,
            status,
            user_id
        });
        return ticket;
    }
    // Get ticket by ID
    async getTicketById(ticket_id) {
        const ticket = await ticket_1.default.findByPk(ticket_id, {
            include: [{ model: Show_1.default, as: "show" }],
        });
        if (!ticket)
            throw new Error("Ticket not found");
        return ticket;
    }
    // Update ticket
    async updateTicket(ticket_id, seat_number, price, show_id, orderInfo, status) {
        const ticket = await ticket_1.default.findByPk(ticket_id);
        if (!ticket)
            throw new Error("Ticket not found");
        if (seat_number)
            ticket.seat_number = seat_number;
        if (price)
            ticket.price = price;
        if (show_id) {
            const show = await Show_1.default.findByPk(show_id);
            if (!show)
                throw new Error("Show not found");
            ticket.show_id = show_id;
        }
        if (orderInfo)
            ticket.orderInfo = orderInfo;
        if (status)
            ticket.status = status;
        await ticket.save();
        return ticket;
    }
    // Delete ticket
    async deleteTicket(ticket_id) {
        const ticket = await ticket_1.default.findByPk(ticket_id);
        if (!ticket)
            throw new Error("Ticket not found");
        await ticket.destroy();
        return { message: "Ticket deleted successfully" };
    }
    // Get tickets by status
    async getTicketsByStatus(status) {
        return await ticket_1.default.findAll({
            where: { status },
            include: [{ model: Show_1.default, as: "show" }],
        });
    }
}
exports.default = new TicketService();
