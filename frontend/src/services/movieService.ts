import axiosInstance from "../api/axiosInstance";
import type { ApiResponse } from "../types/api.types";
import type { Movie,OMDbSearchResponse } from "../types/movie.types";
import { apiErrorHandler } from "../utils/errorhandler";

class MovieService {
  async searchMovies(query: string, page: number = 1) {
    try {
      const response = await axiosInstance.get<ApiResponse<OMDbSearchResponse>>('/movies/search', { params: { query, page } })
     return {
        success: true,
        data: response.data.data?.Search ?? [],
        message: response.data.message,
        totalResults:Number(response.data.data?.totalResults)
      }
    } catch (error) {
      return apiErrorHandler(error, 'Failed to get Result')
    }

  }

 async addToFavourite(data:Movie){
  try {
    const response=await axiosInstance.post<ApiResponse<Movie>>('/movies/favorites',data);
    return{
    success:true,
    data:response.data.data,
    message:response.data.message
    }
  } catch (error) {
    return apiErrorHandler(error,'Failed to Add To Favourites')
  }
 }

  async removeFavorite(imdbID: string){
    try {
        const response = await axiosInstance.delete<ApiResponse<Movie>>( `/movies/favorites/${imdbID}`);
        return{
          success:true,
          data:response.data.data,
          message:response.data.message
        }
    } catch (error) {
      return apiErrorHandler(error,'Failed Remove item')
    }
  }
}
export default new MovieService();