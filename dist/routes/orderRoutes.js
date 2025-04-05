"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/orderRoutes.ts
const express_1 = require("express");
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const router = (0, express_1.Router)();
router.post("/", OrderController_1.default.createOrder);
router.get("/:id", OrderController_1.default.getOrder);
router.put("/:id/status", OrderController_1.default.updateOrderStatus);
router.get("/", OrderController_1.default.getAllOrders);
exports.default = router;
