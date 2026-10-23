
import type { Movie } from "../types/movie.types";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export default function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#141416] transition duration-300 hover:-translate-y-1 hover:border-red-500/60">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#202024]">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No poster available
          </div>
        )}

        <button
          type="button"
          onClick={() => onToggleFavorite(movie)}
          aria-label={
            isFavorite
              ? `Remove ${movie.Title} from favorites`
              : `Add ${movie.Title} to favorites`
          }
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-xl text-white backdrop-blur-sm transition hover:scale-110 hover:bg-black/90"
        >
          <span className={isFavorite ? "text-red-500" : "text-white"}>
            {isFavorite ? "♥" : "♡"}
          </span>
        </button>
      </div>

      <div className="p-4">
        <h2 className="truncate font-display text-base font-semibold">
          {movie.Title}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          {movie.Year}
        </p>
      </div>
    </article>
  );
}
