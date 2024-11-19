"use client"

import MovieCard from './movieCard';


const MovieList: React.FC<MovieListProps> = ({ movies }) => {

    console.log(movies);
    return(
  <div className="movie-list">
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
    )
};

export default MovieList;
