// models/Show.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Movie from "./Movie";
import Theater from "./Theater";
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
            references: { model: Movie, key: "movie_id" },
        },
        theater_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Theater, key: "theater_id" },
        },
    },
    {
        sequelize,
        tableName: "shows",
        timestamps: false,
    }
);

// Associations
Show.belongsTo(Movie, { foreignKey: "movie_id", as: "movie" });
Show.belongsTo(Theater, { foreignKey: "theater_id", as: "theater" });
Show.hasMany(Ticket, { foreignKey: "show_id", as: "tickets" });

export default Show;