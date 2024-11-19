import Link from "next/link";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <div className="movie-card">
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      alt={movie.title}
      className="movie-poster"
    />
    <h2>{movie.title}</h2>
    <p>{movie.overview}</p>
    <p><Link href={`/movie/${movie.id}`}>view</Link></p>
  </div>
);

export default MovieCard;
