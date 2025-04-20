// controllers/PaymentController.ts
import { Request, Response } from "express";
import PaymentService from "../services/PaymentService";
import { sortObject, createHash, formatDate } from "../utils/helper";
import {
  vnp_Url,
  vnp_ReturnUrl,
  vnp_TmnCode,
  vnp_HashSecret,
} from "../config/vnpay-config";

import Ticket from "../models/ticket";

interface VnpParams {
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Amount: number;
  vnp_CurrCode: string;
  vnp_TxnRef: string;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_Locale: string;
  vnp_ReturnUrl: string;
  vnp_IpAddr: string;
  vnp_CreateDate: string;
  [key: string]: string | number;
}
class PaymentController {
  // Create a payment for an order
  async createPayment(req: Request, res: Response) {
    try {
      const { ticket_id, amount, payment_method, transaction_id } = req.body;
console.log(ticket_id, amount, payment_method, transaction_id );
      // Kiểm tra các tham số bắt buộc
      if (!ticket_id || !amount || !payment_method) {
        res.status(400).json({
          message: "Order ID, amount, and payment method are required",
        });
      }

      // Kiểm tra phương thức thanh toán hợp lệ
      if (
        !["credit_card", "debit_card", "paypal", "cash"].includes(
          payment_method
        )
      ) {
        res.status(400).json({ message: "Invalid payment method" });
      }

      // Tạo thanh toán
      const payment = await PaymentService.createPayment(
        ticket_id,
        amount,
        payment_method,
        transaction_id
      );

      // Kiểm tra cấu hình VNPay
      if (!vnp_TmnCode || !vnp_HashSecret) {
        res.status(500).json({ error: "VNPay configuration is missing" });
      }

      // Lấy thông tin đơn hàng
      const ticket = await Ticket.findByPk(ticket_id);
      if (ticket) {
        if (ticket.orderInfo) {
          const orderInfoFormatted = ticket.orderInfo.replace(/\s+/g, "+");
          const createDate = formatDate(new Date());

          const vnp_Params: VnpParams = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: vnp_TmnCode ?? "",
            vnp_Amount: parseInt(amount) * 100,
            vnp_CurrCode: "VND",
            vnp_TxnRef: payment.id.toString(),
            vnp_OrderInfo: orderInfoFormatted,
            vnp_OrderType: "other",
            vnp_Locale: "vn",
            vnp_ReturnUrl: vnp_ReturnUrl,
            vnp_IpAddr: "127.0.0.1",
            vnp_CreateDate: createDate,
          };

          // Tạo chữ ký bảo mật
          const signData = Object.keys(vnp_Params)
            .sort()
            .map((key) => `${key}=${(vnp_Params as Record<string, any>)[key]}`)
            .join("&");

          const secureHash = createHash(signData, vnp_HashSecret ?? "");
          const paymentUrl = `${vnp_Url}?${signData}&vnp_SecureHash=${secureHash}`;

          // Trả về URL thanh toán
          res.status(201).json({ paymentUrl, payment });
        } else {
          res.status(400).json({ error: "Order info is missing" });
        }
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update payment status
  async updatePaymentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { payment_status } = req.body;
      if (!["pending", "completed", "failed"].includes(payment_status)) {
        res.status(400).json({ message: "Invalid payment status" });
      }

      const payment = await PaymentService.updatePaymentStatus(
        Number(id),
        payment_status
      );
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get payment details by order ID
  async getPaymentByOrderId(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const payment = await PaymentService.getPaymentByOrderId(Number(orderId));
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async paymentResult(req: Request, res: Response) {
    try {
      // Kiểm tra nếu không có query params
      if (!Object.keys(req.query).length) {
        res.status(400).json({ error: "Thiếu tham số thanh toán" });
      }

      // Chuyển query params thành object
      const vnp_Params = { ...(req.query as Record<string, string>) };
      const secureHash = vnp_Params.vnp_SecureHash as string;

      delete vnp_Params.vnp_SecureHash;
      delete vnp_Params.vnp_SecureHashType;

      // Sắp xếp tham số theo thứ tự
      const sortedParams = sortObject(vnp_Params);
      const signData = new URLSearchParams(
        Object.entries(sortedParams).map(([key, value]) => [key, String(value)])
      ).toString();

      // Tạo hash để kiểm tra
      const checkHash = createHash(signData, vnp_HashSecret ?? "");

      if (secureHash !== checkHash) {
        res.status(400).json({ error: "Invalid signature" });
      }

      const paymentId = parseInt(vnp_Params.vnp_TxnRef as string);
      const responseCode = vnp_Params.vnp_ResponseCode as string;

      const a = process.env.SEVER_CALLBACK_URL;
      if (a) {
        if (responseCode === "00") {

          await PaymentService.updatePaymentStatus(paymentId, "completed");
          res.redirect(a);
        } else {
          await PaymentService.updatePaymentStatus(paymentId, "failed");
          res.json({ error: `Thanh toán thất bại! Mã lỗi: ${responseCode}` });
        }
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PaymentController();
