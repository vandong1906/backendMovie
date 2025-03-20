// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class User extends Model {
    public User_id!: number;
    public User_name!: string;
    public password!: string;
}

User.init(
    {
        User_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        User_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Users",
        timestamps: false,
    }
);

export default User;