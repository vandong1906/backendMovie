// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class User extends Model {
    public User_id!: number;
    public email!: string;
    public password!: string;
    public role!:string;
}

User.init(
    {
        User_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "user"),
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        sequelize,
        tableName: "Users",
        timestamps: false,
    }
);
export default User;