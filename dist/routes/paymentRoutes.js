"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/paymentRoutes.ts
const express_1 = __importDefault(require("express"));
const PaymentController_1 = __importDefault(require("../controllers/PaymentController"));
const router = express_1.default.Router();
router.post("/", PaymentController_1.default.createPayment);
router.put("/:id/status", PaymentController_1.default.updatePaymentStatus);
router.get("/order/:orderId", PaymentController_1.default.getPaymentByOrderId);
router.get('/payment-result', PaymentController_1.default.paymentResult);
exports.default = router;
