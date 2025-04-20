import  dotenv from "dotenv";
import {Sequelize} from "sequelize";
import fs from 'fs';
dotenv.config({ path: './.env' });
const db = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "movie",
};

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'mysql',
    // port:21954,
    // dialectOptions: {
    //     ssl: {
    //       ca: fs.readFileSync('../ca.pem'),
    //       rejectUnauthorized: true,
    //     },
    //   },
});
export default sequelize;