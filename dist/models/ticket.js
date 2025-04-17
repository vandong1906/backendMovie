"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/ticket.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const Show_1 = __importDefault(require("./Show"));
class Ticket extends sequelize_1.Model {
}
Ticket.init({
    ticket_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderInfo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    seat_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    show_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: Show_1.default, key: "show_id" },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
}, {
    sequelize: db_1.default,
    tableName: "tickets",
    timestamps: true,
});
exports.default = Ticket;
