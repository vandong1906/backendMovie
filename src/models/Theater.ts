// models/Theater.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Show from "./Show";

class Theater extends Model {
    public theater_id!: number;
    public theater_name!: string;
    public location!: string;
}

Theater.init(
    {
        theater_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        theater_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "theaters",
        timestamps: false,
    }
);


Theater.hasMany(Show, { foreignKey: "theater_id", as: "shows" });
Show.belongsTo(Theater, { foreignKey: "theater_id", as: "theater" });


export default Theater;