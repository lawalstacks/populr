export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    // Add other relevant fields from the TMDb response
  }
  
  export async function fetchPopularMovies(page: number = 1): Promise<Movie[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    console.log(`Fetching movies from URL: ${url}`);
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!data.results) {
        throw new Error('No movies found in response');
      }
  
      return data.results; // Return the list of movies
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw new Error('Could not fetch popular movies. Please try again later.');
    }
  }
  