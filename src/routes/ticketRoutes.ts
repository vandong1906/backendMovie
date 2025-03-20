// routes/ticketRoutes.ts
import { Router } from "express";
import TicketController from "../controllers/TicketController";

const router = Router();

router.post("/", TicketController.createTicket);
router.get("/:id", TicketController.getTicket);
router.put("/:id", TicketController.updateTicket);
router.delete("/:id", TicketController.deleteTicket);

export default router;