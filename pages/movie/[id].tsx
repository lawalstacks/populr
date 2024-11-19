import { fetchPopularMovies } from "@/api/tmdb";

interface PageProps {
    movie: any;
  }

  interface Params{
    id: string;
  }
const MovieDetails:React.FC<PageProps> = ({ movie }) => {
  // If the movie data is not provided, display loading or error
  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="p-10">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    </div>
  );
};

// Fetch movie details based on ID
export async function getServerSideProps({ params }: { params: Params }) {
  const movieId = params.id;
  const movies = await fetchPopularMovies();  // Adjust this to fetch details for a specific movie
  const movie = movies?.find((movie: { id: { toString: () => string; }; }) => movie.id.toString() === movieId);
  

  return {
    props: { movie: movie || null }, // Return the movie details or null if not found
  };
}

export default MovieDetails;
