// services/TicketService.ts
import Ticket from "../models/ticket";
import Show from "../models/Show";

class TicketService {
    // Create a new ticket
    async createTicket(seat_number: string, price: number, show_id: number) {
        const show = await Show.findByPk(show_id);
        if (!show) throw new Error("Show not found");

        const ticket = await Ticket.create({ seat_number, price, show_id });
        return ticket;
    }

    // Get ticket by ID
    async getTicketById(ticket_id: number) {
        const ticket = await Ticket.findByPk(ticket_id, {
            include: [{ model: Show, as: "show" }],
        });
        if (!ticket) throw new Error("Ticket not found");
        return ticket;
    }

    // Update ticket
    async updateTicket(ticket_id: number, seat_number?: string, price?: number, show_id?: number) {
        const ticket = await Ticket.findByPk(ticket_id);
        if (!ticket) throw new Error("Ticket not found");

        if (seat_number) ticket.seat_number = seat_number;
        if (price) ticket.price = price;
        if (show_id) {
            const show = await Show.findByPk(show_id);
            if (!show) throw new Error("Show not found");
            ticket.show_id = show_id;
        }
        await ticket.save();
        return ticket;
    }

    // Delete ticket
    async deleteTicket(ticket_id: number) {
        const ticket = await Ticket.findByPk(ticket_id);
        if (!ticket) throw new Error("Ticket not found");

        await ticket.destroy();
        return { message: "Ticket deleted successfully" };
    }
}

export default new TicketService();