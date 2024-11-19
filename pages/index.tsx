import { useEffect, useRef, useState } from "react";
import PopularMovies from "@/components/sections/popularMovies";
import SearchBar from "@/components/searchBar";
import { fetchPopularMovies } from "@/api/tmdb";


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface PageProps {
  movies: Movie[];
}

const Page: React.FC<PageProps> = ({ movies }) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the page for pagination
  const sentinelRef = useRef<HTMLDivElement | null>(null); // Reference to the sentinel element

  // Function to load more movies (simulate loading)
  const loadMoreMovies = async () => {
    if (isLoading) return; // Prevent multiple requests at once
    setIsLoading(true);

    // Simulating a fetch request for additional movies (you can update this with actual logic)
    setPage((prevPage) => prevPage + 1);
    const newMovies = await fetchPopularMovies(page);
    console.log(page)
    setFilteredMovies((prevMovies) => [...prevMovies, ...newMovies]);
    
    console.log(page)
    setIsLoading(false);
  };

  // Use IntersectionObserver to detect when the sentinel is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreMovies(); // Load more movies when sentinel enters view
        }
      },
      { threshold: 1.0 } // Trigger when the entire sentinel is in view
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current); // Start observing the sentinel element
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current); // Clean up the observer
      }
    };
  }, [isLoading, page]); // Re-run effect when isLoading or page changes

  // Search handler
  const handleSearch = (query: string) => {
    const filtered = movies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered); // Update the filtered movies
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} /> {/* Search bar */}
      <PopularMovies movies={filteredMovies} /> {/* Popular movies list */}

      {/* Sentinel element */}
      <div ref={sentinelRef} style={{ height: "20px" }}></div>
      
      {isLoading && <p>Loading...</p>} {/* Show loading indicator while fetching */}
    </div>
  );
};

// Fetch initial data using server-side rendering (SSR)
export async function getServerSideProps() {
  const initialPage = 1;
  const movies = await fetchPopularMovies(initialPage);
  return {
    props: { movies, initialPage },
  };
}

export default Page;
