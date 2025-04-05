// models/Order.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

import Ticket from "./ticket";
import User from "./user";

interface OrderAttributes {
    id: number;
    orderInfo: string;
    total_amount: number;
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id" | "createdAt" | "updatedAt"> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public khachHang_id?: number;
    public total_amount!: number;
    public orderInfo!: string;
    public status!: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        orderInfo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
            allowNull: false,
            defaultValue: "pending",
        },
    },
    {
        sequelize,
        tableName: "orders",
        timestamps: true,
    }
);

// Associations
Order.hasMany(Ticket, { foreignKey: "Order_id", as: "tickets" });
Ticket.belongsTo(Order, { foreignKey: "Order_id", as: "order" });


User.hasMany(Order, { foreignKey: "User_id", as: "orders" });
Order.belongsTo(User, { foreignKey: "User_id", as: "user" });
export default Order;