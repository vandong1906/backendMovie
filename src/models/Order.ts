// models/Order.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import khachHang from "./KhachHang";
import Ticket from "./Ticket";

interface OrderAttributes {
    id: number;
    khachHang_id?: number;
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
        khachHang_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: khachHang, key: "id" },
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
Order.belongsTo(khachHang, { foreignKey: "khachHang_id", as: "customer" });
Order.hasMany(Ticket, { foreignKey: "order_id", as: "tickets" });

export default Order;