import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface NhanVienAttributes {
    id: number;
    hoTen: string; // Full name
    diaChi: string; // Address
    soDT: string; // Phone number
    ngaySinh: Date; // Date of birth
    phuCap: number; // Allowance/Bonus
    createdAt?: Date;
    updatedAt?: Date;
}

interface NhanVienCreationAttributes extends Optional<NhanVienAttributes, "id" | "createdAt" | "updatedAt"> {}

class NhanVien extends Model<NhanVienAttributes, NhanVienCreationAttributes> implements NhanVienAttributes {
    public id!: number;
    public hoTen!: string;
    public diaChi!: string;
    public soDT!: string;
    public ngaySinh!: Date;
    public phuCap!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

NhanVien.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        hoTen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        diaChi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        soDT: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ngaySinh: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        phuCap: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
        },
    },
    {
        sequelize,
        tableName: "nhanvien",
        timestamps: true,
    }
);

export default NhanVien;