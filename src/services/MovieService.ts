// services/MovieService.ts
import Movie from "../models/Movie";
import Show from "../models/Show";

class MovieService {
  // Create a new movie
  async createMovie(
    movie_name: string,
    genre: string,
    duration: string,
    path: string
  ) {
    const movie = await Movie.create({ movie_name, genre, duration, path });
    return movie;
  }

  // Get movie by ID
  async getMovieById(movie_id: number) {
    const movie = await Movie.findByPk(movie_id, {
      include: [{ model: Show, as: "shows" }],
    });
    if (!movie) throw new Error("Movie not found");
    return movie;
  }

  // Update movie
  async updateMovie(
    movie_id: number,
    movie_name?: string,
    genre?: string,
    duration?: string,
    path?: string
  ) {
    console.log(movie_id, movie_name, genre, duration, path);
    const movie = await Movie.update(
      { movie_name, genre, duration, path },
      { where: { movie_id } }
    );

    console.log(movie);
    return movie;
  }
  // Delete movie
  async deleteMovie(movie_id: number) {
    const movie = await Movie.findByPk(movie_id);
    if (!movie) throw new Error("Movie not found");

    await movie.destroy();
    return { message: "Movie deleted successfully" };
  }
  async getAllMovies() {
    const movies = await Movie.findAll({
      include: [{ model: Show, as: "shows" }],
    });
    return movies;
  }
}

export default new MovieService();
