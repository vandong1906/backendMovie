// models/ticket.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db"; // Adjust path to your Sequelize instance
import Show from "./Show"; // Adjust path to your Show model

class Ticket extends Model {
  public ticket_id!: number;
  public seat_number!: string;
  public price!: number;
  public show_id!: number;
  public orderInfo!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public status!: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
}

Ticket.init(
  {
    ticket_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seat_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    show_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Show, key: "show_id" },
    },
    status: {
        type: DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "tickets",
    timestamps: true,
  }
);


export default Ticket;
