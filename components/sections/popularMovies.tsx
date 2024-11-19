"use client"

import MovieList from "../movieList";
import SearchBar from "../searchBar";


const PopularMovies: React.FC<PopularPageProps> = ({ movies }) => {
    console.log({movies});
   
    if (!movies || movies.length === 0) {
        return <div>No movies available</div>;
      }

    return(
  <div className="p-10">
    
    <h1>Popular Movies</h1>
    <div className="">
   
    <MovieList movies={movies} />

    </div>
  </div>
    )
    
};

export default PopularMovies;
