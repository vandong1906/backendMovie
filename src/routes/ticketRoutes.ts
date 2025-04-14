// routes/ticketRoutes.ts
import { Router } from "express";
import TicketController from "../controllers/TicketController";

const router = Router();

router.post("/", TicketController.createTicket);
router.get("/:id", TicketController.getTicket);
router.put("/:id", TicketController.updateTicket);
router.delete("/:id", TicketController.deleteTicket);
router.get("/", TicketController.getAllTickets);
router.get("/show/:show_id", TicketController.getTicketsByShowId); // New route

export default router;