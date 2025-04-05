"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Movie.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const Show_1 = __importDefault(require("./Show"));
class Movie extends sequelize_1.Model {
}
Movie.init({
    movie_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    movie_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "movies",
    timestamps: false,
});
// Associations
Movie.hasMany(Show_1.default, { foreignKey: "movie_id", as: "shows" });
exports.default = Movie;
