import type { Movie } from "../types/movies.types";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "favorites.json");
export async function readFavorites(): Promise<Movie[]> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    const data = await readFile(FILE_PATH, "utf-8");
    return JSON.parse(data) as Movie[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await saveFavorites([]);
      return [];
    }

    throw error;
  }
}

export async function saveFavorites(
  favorites: Movie[]
): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });

  await writeFile(
    FILE_PATH,
    JSON.stringify(favorites, null, 2),
    "utf-8"
  );
}