
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0d] text-white">
      <Navbar />

      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#171012] bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,13,0.98)_0%,rgba(11,11,13,0.85)_38%,rgba(11,11,13,0.24)_100%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(0deg,#0b0b0d_0%,transparent_35%)]" />

        <div className="relative z-10 mx-auto w-[82%] py-36">
          <p className="text-[10px] font-bold tracking-[3px] text-red-400">
            YOUR NEXT FAVORITE FILM AWAITS
          </p>

          <h1 className="mt-6 font-display text-5xl leading-tight font-bold tracking-tight sm:text-7xl lg:text-8xl">
            Every movie.
            <br />
            <span className="text-red-500">
              One destination.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-8 text-gray-300 sm:text-base">
            Discover unforgettable stories, explore your favorite
            genres, and build a collection of movies you'll love.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/movies"
              className="inline-flex items-center gap-4 rounded-md bg-red-600 px-6 py-4 text-xs font-bold transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              Explore Movies <span>→</span>
            </Link>

            <Link
              to="/movies"
              className="inline-flex items-center rounded-md border border-white/25 bg-black/30 px-6 py-4 text-xs font-bold transition hover:bg-white/10"
            >
              Find your next film
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-3 text-[9px] tracking-[1.5px] text-gray-400">
            <span className="size-2 rounded-full bg-red-500 shadow-[0_0_12px_#f14b5d]" />
            SEARCH · DISCOVER · SAVE YOUR FAVORITES
          </div>
        </div>

        <div className="absolute right-[7%] bottom-8 left-[7%] flex justify-between text-[9px] tracking-[2px] text-gray-400">
          <span>YOUR PERSONAL CINEMA</span>
          <span>01 / DISCOVER</span>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <p className="text-[10px] font-bold tracking-[3px] text-red-400">
          MADE FOR MOVIE LOVERS
        </p>

        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Not sure what to watch next?
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-400">
          Search for movies, discover new stories, and save the ones
          you never want to forget.
        </p>

        <Link
          to="/movies"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300"
        >
          Start exploring <span>→</span>
        </Link>
      </section>

      <footer className="flex flex-col justify-between gap-3 border-t border-white/10 px-[7%] py-6 text-xs text-gray-500 sm:flex-row">
        <span>MovieFinder © 2026</span>
        <span>Made for the love of cinema.</span>
      </footer>
    </main>
  );
}
