import Ticket from "../models/ticket";
import Show from "../models/Show";

class TicketService {
  // Create ticket
  async getAllTickets() {
    const tickets = await Ticket.findAll({
      include: [{ model: Show, as: "show" }],
    });
    return tickets;
  }

  // Get all tickets by show ID
  async getTicketsByShowId(show_id: number) {
    const tickets = await Ticket.findAll({
      where: { show_id },
      include: [{ model: Show, as: "show" }],
    });
    if (!tickets || tickets.length === 0) throw new Error("No tickets found for this show");
    return tickets;
  }
  async createTicket(
    seat_number: string,
    price: number,
    show_id: number,
    orderInfo: string,
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled" = "pending",
    user_id:number
  ) {
    const show = await Show.findByPk(show_id);
    if (!show) throw new Error("Show not found");

    const ticket = await Ticket.create({
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
  async getTicketById(ticket_id: number) {
    const ticket = await Ticket.findByPk(ticket_id, {
      include: [{ model: Show, as: "show" }],
    });
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  }

  // Update ticket
  async updateTicket(
    ticket_id: number,
    seat_number?: string,
    price?: number,
    show_id?: number,
    orderInfo?: string,
    status?: "pending" | "paid" | "shipped" | "delivered" | "cancelled"
  ) {
    const ticket = await Ticket.findByPk(ticket_id);
    if (!ticket) throw new Error("Ticket not found");

    if (seat_number) ticket.seat_number = seat_number;
    if (price) ticket.price = price;
    if (show_id) {
      const show = await Show.findByPk(show_id);
      if (!show) throw new Error("Show not found");
      ticket.show_id = show_id;
    }
    if (orderInfo) ticket.orderInfo = orderInfo;
    if (status) ticket.status = status;

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

  // Get tickets by status
  async getTicketsByStatus(status: "pending" | "paid" | "shipped" | "delivered" | "cancelled") {
    return await Ticket.findAll({
      where: { status },
      include: [{ model: Show, as: "show" }],
    });
  }
}

export default new TicketService();
