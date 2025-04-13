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
// Movie - Show
Movie_1.default.hasMany(Show_1.default, { foreignKey: 'movie_id' });
Show_1.default.belongsTo(Movie_1.default, { foreignKey: 'movie_id' });
// Theater - Show
Theater_1.default.hasMany(Show_1.default, { foreignKey: 'theater_id' });
Show_1.default.belongsTo(Theater_1.default, { foreignKey: 'theater_id' });
// Show - Ticket
Show_1.default.hasMany(ticket_1.default, { foreignKey: 'show_id' });
ticket_1.default.belongsTo(Show_1.default, { foreignKey: 'show_id' });
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
