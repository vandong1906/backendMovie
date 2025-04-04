"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class NhanVien extends sequelize_1.Model {
}
NhanVien.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hoTen: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    diaChi: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    soDT: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ngaySinh: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    phuCap: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
}, {
    sequelize: db_1.default,
    tableName: "nhanvien",
    timestamps: true,
});
exports.default = NhanVien;
