// models/Payment.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Order from "./Order";

interface PaymentAttributes {
    id: number;
    order_id: number;
    amount: number;
    payment_method: "credit_card" | "debit_card" | "paypal" | "cash";
    payment_status: "pending" | "completed" | "failed";
    transaction_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id" | "createdAt" | "updatedAt"> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
    public id!: number;
    public order_id!: number;
    public amount!: number;
    public payment_method!: "credit_card" | "debit_card" | "paypal" | "cash";
    public payment_status!: "pending" | "completed" | "failed";
    public transaction_id?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Payment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Order, key: "id" },
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.ENUM("credit_card", "debit_card", "paypal", "cash"),
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.ENUM("pending", "completed", "failed"),
            allowNull: false,
            defaultValue: "pending",
        },
        transaction_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "payments",
        timestamps: true,
    }
);

Order.hasMany(Payment, { foreignKey: "order_id", as: "payments" });
Payment.belongsTo(Order, { foreignKey: "order_id", as: "order" });

export default Payment;