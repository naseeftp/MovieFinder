import { Movie, OMDbSearchResponse } from "../../types/movies.types";

export interface IMovieRepository{
    searchMovies(query:string,page:number):Promise<OMDbSearchResponse>
}