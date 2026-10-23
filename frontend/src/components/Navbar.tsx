
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/10 px-[7%] py-5">
      <Link
        to="/"
        className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
      >
        <span className="grid size-9 place-items-center rounded-lg bg-red-600 text-xl text-white">
          M
        </span>
        MovieFinder
      </Link>

      <nav className="flex items-center gap-5 sm:gap-8">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `text-xs transition sm:text-sm ${
              isActive
                ? "text-white underline decoration-red-500 underline-offset-8"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `text-xs transition sm:text-sm ${
              isActive
                ? "text-white underline decoration-red-500 underline-offset-8"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          Explore Movies
        </NavLink>
      </nav>

   
    </header>
  );
}
