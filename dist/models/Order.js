"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Order.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const ticket_1 = __importDefault(require("./ticket"));
const user_1 = __importDefault(require("./user"));
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderInfo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    total_amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
}, {
    sequelize: db_1.default,
    tableName: "orders",
    timestamps: true,
});
// Associations
Order.hasMany(ticket_1.default, { foreignKey: "Order_id", as: "tickets" });
ticket_1.default.belongsTo(Order, { foreignKey: "Order_id", as: "order" });
user_1.default.hasMany(Order, { foreignKey: "User_id", as: "orders" });
Order.belongsTo(user_1.default, { foreignKey: "User_id", as: "user" });
exports.default = Order;
