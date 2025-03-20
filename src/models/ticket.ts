// models/Ticket.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Show from "./Show";

interface TicketAttributes {
    ticket_id: number;
    seat_number: string;
    price: number;
    show_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, "ticket_id" | "createdAt" | "updatedAt"> {}

class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
    public ticket_id!: number;
    public seat_number!: string;
    public price!: number;
    public show_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Ticket.init(
    {
        ticket_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
    },
    {
        sequelize,
        tableName: "tickets",
        timestamps: true,
    }
);

// Associations
Ticket.belongsTo(Show, { foreignKey: "show_id", as: "show" });

export default Ticket;