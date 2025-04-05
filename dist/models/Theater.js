"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Theater.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const Show_1 = __importDefault(require("./Show"));
class Theater extends sequelize_1.Model {
}
Theater.init({
    theater_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    theater_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "theaters",
    timestamps: false,
});
Theater.hasMany(Show_1.default, { foreignKey: "theater_id", as: "shows" });
Show_1.default.belongsTo(Theater, { foreignKey: "theater_id", as: "theater" });
exports.default = Theater;
