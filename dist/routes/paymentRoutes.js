"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/paymentRoutes.ts
const express_1 = require("express");
const PaymentController_1 = __importDefault(require("../controllers/PaymentController"));
const router = (0, express_1.Router)();
router.post("/", PaymentController_1.default.createPayment);
router.put("/:id/status", PaymentController_1.default.updatePaymentStatus);
router.get("/order/:orderId", PaymentController_1.default.getPaymentByOrderId);
exports.default = router;
