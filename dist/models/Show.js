"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Show.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const ticket_1 = __importDefault(require("./ticket"));
class Show extends sequelize_1.Model {
}
Show.init({
    show_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    show_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    movie_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    theater_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "shows",
    timestamps: false,
});
Show.hasMany(ticket_1.default, { foreignKey: "Show_id", as: "Shows" });
ticket_1.default.belongsTo(Show, { foreignKey: "Ticket_id", as: "Ticket" });
exports.default = Show;
