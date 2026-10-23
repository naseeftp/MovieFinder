import axios from "axios";
import { OMDbSearchResponse } from "../../types/movies.types";
import { IMovieRepository } from "../interfaces/IMovie.repository";

export class MovieRepository implements IMovieRepository{
    async searchMovies(query: string,page:number): Promise<OMDbSearchResponse> {
      
        const response=await axios.get<OMDbSearchResponse>(
             "https://www.omdbapi.com/",
             {
                params:{
                    apikey:process.env.OMDB_API_KEY,
                    s:query,
                    type:'movie',
                    page
                },
                timeout:10000
             }
        )
        const result=response.data;
        return result
    }
}