"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Payment.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const Order_1 = __importDefault(require("./Order"));
class Payment extends sequelize_1.Model {
}
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: Order_1.default, key: "id" },
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    payment_method: {
        type: sequelize_1.DataTypes.ENUM("credit_card", "debit_card", "paypal", "cash"),
        allowNull: false,
    },
    payment_status: {
        type: sequelize_1.DataTypes.ENUM("pending", "completed", "failed"),
        allowNull: false,
        defaultValue: "pending",
    },
    transaction_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "payments",
    timestamps: true,
});
// Associations
Payment.belongsTo(Order_1.default, { foreignKey: "order_id", as: "order" });
exports.default = Payment;
