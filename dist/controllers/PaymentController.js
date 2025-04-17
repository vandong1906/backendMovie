"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentService_1 = __importDefault(require("../services/PaymentService"));
const helper_1 = require("../utils/helper");
const vnpay_config_1 = require("../config/vnpay-config");
const ticket_1 = __importDefault(require("../models/ticket"));
class PaymentController {
    // Create a payment for an order
    async createPayment(req, res) {
        try {
            const { ticket_id, amount, payment_method, transaction_id } = req.body;
            console.log(ticket_id, amount, payment_method, transaction_id);
            // Kiểm tra các tham số bắt buộc
            if (!ticket_id || !amount || !payment_method) {
                res.status(400).json({
                    message: "Order ID, amount, and payment method are required",
                });
            }
            // Kiểm tra phương thức thanh toán hợp lệ
            if (!["credit_card", "debit_card", "paypal", "cash"].includes(payment_method)) {
                res.status(400).json({ message: "Invalid payment method" });
            }
            // Tạo thanh toán
            const payment = await PaymentService_1.default.createPayment(ticket_id, amount, payment_method, transaction_id);
            // Kiểm tra cấu hình VNPay
            if (!vnpay_config_1.vnp_TmnCode || !vnpay_config_1.vnp_HashSecret) {
                res.status(500).json({ error: "VNPay configuration is missing" });
            }
            // Lấy thông tin đơn hàng
            const ticket = await ticket_1.default.findByPk(ticket_id);
            if (ticket) {
                if (ticket.orderInfo) {
                    const orderInfoFormatted = ticket.orderInfo.replace(/\s+/g, "+");
                    const createDate = (0, helper_1.formatDate)(new Date());
                    const vnp_Params = {
                        vnp_Version: "2.1.0",
                        vnp_Command: "pay",
                        vnp_TmnCode: vnpay_config_1.vnp_TmnCode ?? "",
                        vnp_Amount: parseInt(amount) * 100,
                        vnp_CurrCode: "VND",
                        vnp_TxnRef: payment.id.toString(),
                        vnp_OrderInfo: orderInfoFormatted,
                        vnp_OrderType: "other",
                        vnp_Locale: "vn",
                        vnp_ReturnUrl: vnpay_config_1.vnp_ReturnUrl,
                        vnp_IpAddr: "127.0.0.1",
                        vnp_CreateDate: createDate,
                    };
                    // Tạo chữ ký bảo mật
                    const signData = Object.keys(vnp_Params)
                        .sort()
                        .map((key) => `${key}=${vnp_Params[key]}`)
                        .join("&");
                    const secureHash = (0, helper_1.createHash)(signData, vnpay_config_1.vnp_HashSecret ?? "");
                    const paymentUrl = `${vnpay_config_1.vnp_Url}?${signData}&vnp_SecureHash=${secureHash}`;
                    // Trả về URL thanh toán
                    res.status(201).json({ paymentUrl, payment });
                }
                else {
                    res.status(400).json({ error: "Order info is missing" });
                }
            }
            else {
                res.status(404).json({ error: "Order not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Update payment status
    async updatePaymentStatus(req, res) {
        try {
            const { id } = req.params;
            const { payment_status } = req.body;
            if (!["pending", "completed", "failed"].includes(payment_status)) {
                res.status(400).json({ message: "Invalid payment status" });
            }
            const payment = await PaymentService_1.default.updatePaymentStatus(Number(id), payment_status);
            res.status(200).json(payment);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Get payment details by order ID
    async getPaymentByOrderId(req, res) {
        try {
            const { orderId } = req.params;
            const payment = await PaymentService_1.default.getPaymentByOrderId(Number(orderId));
            res.status(200).json(payment);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async paymentResult(req, res) {
        try {
            // Kiểm tra nếu không có query params
            if (!Object.keys(req.query).length) {
                res.status(400).json({ error: "Thiếu tham số thanh toán" });
            }
            // Chuyển query params thành object
            const vnp_Params = { ...req.query };
            const secureHash = vnp_Params.vnp_SecureHash;
            delete vnp_Params.vnp_SecureHash;
            delete vnp_Params.vnp_SecureHashType;
            // Sắp xếp tham số theo thứ tự
            const sortedParams = (0, helper_1.sortObject)(vnp_Params);
            const signData = new URLSearchParams(Object.entries(sortedParams).map(([key, value]) => [key, String(value)])).toString();
            // Tạo hash để kiểm tra
            const checkHash = (0, helper_1.createHash)(signData, vnpay_config_1.vnp_HashSecret ?? "");
            if (secureHash !== checkHash) {
                res.status(400).json({ error: "Invalid signature" });
            }
            const paymentId = parseInt(vnp_Params.vnp_TxnRef);
            const responseCode = vnp_Params.vnp_ResponseCode;
            const a = process.env.SEVER_CALLBACK_URL;
            if (a) {
                if (responseCode === "00") {
                    await PaymentService_1.default.updatePaymentStatus(paymentId, "completed");
                    res.redirect(a);
                }
                else {
                    await PaymentService_1.default.updatePaymentStatus(paymentId, "failed");
                    res.json({ error: `Thanh toán thất bại! Mã lỗi: ${responseCode}` });
                }
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new PaymentController();
