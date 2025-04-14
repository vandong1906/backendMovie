import Movie from './Movie';
import Theater from './Theater';
import Show from './Show';
import Ticket from './ticket';
import User from './user';
import Payment from './payment';


// Movie - Show
Movie.hasMany(Show, { foreignKey: "movie_id", as: "shows" });
Show.belongsTo(Movie, { foreignKey: "movie_id", as: "movie" });

// Theater - Show
Theater.hasMany(Show, { foreignKey: "theater_id", as: "shows" });
Show.belongsTo(Theater, { foreignKey: "theater_id", as: "theater" });

// Ticket - Payment
Ticket.hasOne(Payment, { foreignKey: "ticket_id", as: "payment" });
Payment.belongsTo(Ticket, { foreignKey: "ticket_id", as: "ticket" });

// Show - Ticket
Show.hasMany(Ticket, { foreignKey: "show_id", as: "tickets" });
Ticket.belongsTo(Show, { foreignKey: "show_id", as: "show" });

// User - Ticket
User.hasMany(Ticket, { foreignKey: "user_id", as: "tickets" });
Ticket.belongsTo(User, { foreignKey: "user_id", as: "user" });

// User (Admin) - Movie
User.hasMany(Movie, { foreignKey: "admin_id", as: "movies" });
Movie.belongsTo(User, { foreignKey: "admin_id", as: "admin" });

// User (Admin) - Theater
User.hasMany(Theater, { foreignKey: "admin_id", as: "theaters" });
Theater.belongsTo(User, { foreignKey: "admin_id", as: "admin" });
export default function setupAssociations() {
  console.log('All associations are set up!');
}
