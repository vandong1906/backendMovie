import Movie from './Movie';
import Theater from './Theater';
import Show from './Show';
import Ticket from './ticket';
import User from './user';


// Movie - Show
Movie.hasMany(Show, { foreignKey: 'movie_id' });
Show.belongsTo(Movie, { foreignKey: 'movie_id' });

// Theater - Show
Theater.hasMany(Show, { foreignKey: 'theater_id' });
Show.belongsTo(Theater, { foreignKey: 'theater_id' });

// Show - Ticket
Show.hasMany(Ticket, { foreignKey: 'show_id' });
Ticket.belongsTo(Show, { foreignKey: 'show_id' });

// (Tuỳ chọn) Admin - Movie, Theater
// Admin.hasMany(Movie, { foreignKey: 'admin_id' });
// Admin.hasMany(Theater, { foreignKey: 'admin_id' });
// Movie.belongsTo(Admin, { foreignKey: 'admin_id' });
// Theater.belongsTo(Admin, { foreignKey: 'admin_id' });
User.hasMany(Ticket, { foreignKey: "user_id", as: "tickets" }); 
Ticket.belongsTo(User, { foreignKey: "user_id", as: "user" })
export default function setupAssociations() {
  console.log('All associations are set up!');
}
