type MovieCardProps = {
    movie: {
      id: string;
      title: string;
      poster_path: string;
      overview: string;
    };
  };

  type Movie = {
    id: sting;
    title: string;
    poster_path: string;
    overview: string;
  };

  
  type PopularPageProps = {
    movies: Movie[];
  };
  
  
type  MovieListProps = {
    movies: Movie[];
  };

type MoviesApiResponse ={
  page: number;
  results: Movie[];
  total_pages: number;
  poster_path:string;
  total_results: number;
}
