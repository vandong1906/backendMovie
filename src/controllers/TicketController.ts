import { Request, Response } from "express";
import TicketService from "../services/TicketService";

class TicketController {
  // Create ticket
  
  async createTicket(req: Request, res: Response) {
    try {
      const { seat_number, price, show_id, orderInfo, status,user_id } = req.body;

      if (!seat_number || !price || !show_id || !orderInfo) {
         res.status(400).json({
          message: "Seat number, price, show ID, and orderInfo are required",
        });
      }
      else {
          const ticket = await TicketService.createTicket(
            seat_number,
            price,
            show_id,
            orderInfo,
            status,
            user_id // có thể undefined, service sẽ mặc định là "pending"
          );
    
          res.status(201).json(ticket);

      }

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get ticket by ID
  async getTicket(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ticket = await TicketService.getTicketById(Number(id));
      res.status(200).json(ticket);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update ticket
  async updateTicket(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { seat_number, price, show_id, orderInfo, status } = req.body;

      const ticket = await TicketService.updateTicket(
        Number(id),
        seat_number,
        price,
        show_id,
        orderInfo,
        status
      );

      res.status(200).json(ticket);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete ticket
  async deleteTicket(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await TicketService.deleteTicket(Number(id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async getAllTickets(req: Request, res: Response) {
    try {
      const tickets = await TicketService.getAllTickets();
      res.status(200).json(tickets);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async getTicketsByShowId(req: Request, res: Response) {
    try {
      const { show_id } = req.params;
      const tickets = await TicketService.getTicketsByShowId(Number(show_id));
      res.status(200).json(tickets);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TicketController();
