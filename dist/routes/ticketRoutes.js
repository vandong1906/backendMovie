"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/ticketRoutes.ts
const express_1 = require("express");
const TicketController_1 = __importDefault(require("../controllers/TicketController"));
const router = (0, express_1.Router)();
router.post("/", TicketController_1.default.createTicket);
router.get("/:id", TicketController_1.default.getTicket);
router.put("/:id", TicketController_1.default.updateTicket);
router.delete("/:id", TicketController_1.default.deleteTicket);
exports.default = router;
