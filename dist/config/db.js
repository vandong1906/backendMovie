"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config({ path: './.env' });
const db = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "movie",
};
const sequelize = new sequelize_1.Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'mysql',
    port: 21954,
    dialectOptions: {
        ssl: {
            ca: fs_1.default.readFileSync('../ca.pem'),
            rejectUnauthorized: true,
        },
    },
});
exports.default = sequelize;
