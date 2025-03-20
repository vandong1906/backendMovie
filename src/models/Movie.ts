// models/Movie.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Show from "./Show";

class Movie extends Model {
    public movie_id!: number;
    public movie_name!: string;
    public genre!: string;
    public duration!: string; // Stored as a string (e.g., "2h 30m")
}

Movie.init(
    {
        movie_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        movie_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "movies",
        timestamps: false,
    }
);

// Associations
Movie.hasMany(Show, { foreignKey: "movie_id", as: "shows" });

export default Movie;