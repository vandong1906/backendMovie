// models/Show.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Ticket from "./ticket";

class Show extends Model {
    public show_id!: number;
    public show_time!: Date;
    public movie_id!: number;
    public theater_id!: number;
}

Show.init(
    {
        show_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        show_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          
        },
        theater_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
       
    },
    {
        sequelize,
        tableName: "shows",
        timestamps: false,
    }
);

export default Show;