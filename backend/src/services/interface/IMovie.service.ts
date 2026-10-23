import { Movie, OMDbSearchResponse } from "../../types/movies.types";

export interface IMovieService{
    findMovies(query:string,page:number):Promise<OMDbSearchResponse>
    addFavourite(movie:Movie):Promise<Movie>
    removeFavourite(imdbID: string):Promise<Movie>
}