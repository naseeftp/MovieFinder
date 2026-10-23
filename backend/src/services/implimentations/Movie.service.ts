import MESSAGES from "../../constants/message.constant";
import { BadRequestError, ConflictError } from "../../errors/appError";
import { IMovieRepository } from "../../repositories/interfaces/IMovie.repository";
import { Movie, OMDbSearchResponse } from "../../types/movies.types";
import { IMovieService } from "../interface/IMovie.service";
import {
    readFavorites,
    saveFavorites,
} from "../../storage/movies.storage";

export class MovieService implements IMovieService {
    constructor(
        private movieRepo: IMovieRepository
    ) { }
    async findMovies(query: string, page: number): Promise<OMDbSearchResponse> {
        const searchTerm = query.trim();
        if (!searchTerm) {
            throw new BadRequestError(MESSAGES.QUERY_MISSING)
        }
        const result = await this.movieRepo.searchMovies(searchTerm, page);

        return result
    }
    async addFavourite(movie: Movie): Promise<Movie> {
        if (!movie || !movie.imdbID) {
            throw new BadRequestError(MESSAGES.NOT_VALID_MOVIE);
        }
       const favorites = await readFavorites();
       const existing = favorites.find(
            (favorite) => favorite.imdbID === movie.imdbID
        );
        if (existing) {
            throw new ConflictError(MESSAGES.ALLREADY_ADDED);
        }
        favorites.push(movie);
        await saveFavorites(favorites);
        return movie;
    }
    async removeFavourite(imdbID: string): Promise<Movie> {
        if(!imdbID||!imdbID.trim()){
            throw new BadRequestError(MESSAGES.NOT_VALID_MOVIE)
        }
        const favorites=await readFavorites();
        const movieIndex=favorites.findIndex(
            (favorite)=>favorite.imdbID===imdbID
        )
        if(movieIndex==-1){
            throw new BadRequestError(MESSAGES.FAVRT_NOT_FOUND)
        }
        const [removedMovie]=favorites.splice(movieIndex,1)
        await saveFavorites(favorites);
        return removedMovie
    }

}