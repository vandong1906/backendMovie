"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupAssociations;
const Movie_1 = __importDefault(require("./Movie"));
const Theater_1 = __importDefault(require("./Theater"));
const Show_1 = __importDefault(require("./Show"));
const ticket_1 = __importDefault(require("./ticket"));
const user_1 = __importDefault(require("./user"));
const payment_1 = __importDefault(require("./payment"));
// Associations
Movie_1.default.hasMany(Show_1.default, { foreignKey: "movie_id", as: "shows" });
Show_1.default.belongsTo(Movie_1.default, { foreignKey: "movie_id", as: "movies" });
// Theater - Show
Theater_1.default.hasMany(Show_1.default, { foreignKey: "theater_id", as: "shows" });
Show_1.default.belongsTo(Theater_1.default, { foreignKey: "theater_id", as: "theater" });
// Ticket 1 - 1 Payment
ticket_1.default.hasOne(payment_1.default, { foreignKey: "ticket_id", as: "payment" });
payment_1.default.belongsTo(ticket_1.default, { foreignKey: "ticket_id", as: "ticket" });
// Show - Ticket
// Một Show có nhiều Ticket
Show_1.default.hasMany(ticket_1.default, { foreignKey: "show_id", as: "tickets" });
// Mỗi Ticket thuộc về một Show
ticket_1.default.belongsTo(Show_1.default, { foreignKey: "show_id", as: "show" });
// (Tuỳ chọn) Admin - Movie, Theater
// Admin.hasMany(Movie, { foreignKey: 'admin_id' });
// Admin.hasMany(Theater, { foreignKey: 'admin_id' });
// Movie.belongsTo(Admin, { foreignKey: 'admin_id' });
// Theater.belongsTo(Admin, { foreignKey: 'admin_id' });
user_1.default.hasMany(ticket_1.default, { foreignKey: "user_id", as: "tickets" });
ticket_1.default.belongsTo(user_1.default, { foreignKey: "user_id", as: "user" });
function setupAssociations() {
    console.log('All associations are set up!');
}
