import { useState, useEffect } from "react";
import movieService from "../services/movieService";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import useDebounce from "../hooks/useDebounce";
import { MOVIE_SEARCH_TERMS } from "../constants/movie.constants";
import type { Movie } from "../types/movie.types";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";

function getRandomMovieQuery(): string {
  const randomIndex = Math.floor(
    Math.random() * MOVIE_SEARCH_TERMS.length
  );

  return MOVIE_SEARCH_TERMS[randomIndex];
}

export default function MoviesPage() {
  const [initialQuery] = useState(getRandomMovieQuery);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const handleToggleFavorite = async (movie: Movie) => {
    const isFavorite = favoriteIds.includes(movie.imdbID);

    try {
      if (isFavorite) {
        await movieService.removeFavorite(movie.imdbID);

        setFavoriteIds((prev) =>
          prev.filter((id) => id !== movie.imdbID)
        );
        toast.success(`${movie.Title} removed From Favourites`)
      } else {
        await movieService.addToFavourite(movie);
        setFavoriteIds((prev) =>
          prev.includes(movie.imdbID)
            ? prev
            : [...prev, movie.imdbID]
        );
        toast.success(`${movie.Title} Added To Favorite`)
      }
    } catch (error) {
       toast.error("Unable to update favourites. Please try again.");
    }
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const searchTerm = debouncedQuery.trim() || initialQuery;
        const results = await movieService.searchMovies(searchTerm,currentPage);
        if (results.success && results.data) {
          setMovies(results.data)
          setTotalResults(results.totalResults)
        }
      } catch {

        setError("Unable to load movies. Please try again.");
        setMovies([]);

      } finally {

        setLoading(false);

      }
    };
    fetchMovies();

  }, [debouncedQuery, initialQuery, currentPage]);

  return (
    <main className="min-h-screen bg-[#0b0b0d] text-white">
      <Navbar />

      <section className="px-[7%] pb-20 pt-36">
        <p className="text-[10px] font-bold tracking-[3px] text-red-400">
          YOUR NEXT FAVORITE FILM
        </p>

        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Explore <span className="text-red-500">Movies.</span>
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-gray-400">
          Discover great stories, explore movies, and find your
          next favourite film.
        </p>

        <SearchBar value={query} onChange={setQuery} />

        <div className="mt-12 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">
            {query.trim() ? "Search Results" : "Discover Movies"}
          </h2>

          {!loading && !error && (
            <span className="text-xs text-gray-500">
              {movies.length} results
            </span>
          )}
        </div>

        {loading && (
          <p className="py-16 text-center text-gray-400">
            Finding movies...
          </p>
        )}

        {!loading && error && (
          <p className="py-16 text-center text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && movies.length === 0 && (
          <p className="py-16 text-center text-gray-400">
            No movies found. Try another title.
          </p>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={favoriteIds.includes(movie.imdbID)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
        {!loading && !error && movies.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </main>
  );
}
