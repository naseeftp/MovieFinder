import { Request, Response, NextFunction } from "express";
import { IMovieService } from "../../services/interface/IMovie.service";
import { IMovieController } from "../interfaces/IMovie.controller";
import { SuccessResponse } from "../../utils/response.utils";
import MESSAGES from "../../constants/message.constant";
import { HttpStatus } from "../../constants/constants";
import { Movie } from "../../types/movies.types";
export class MovieController implements IMovieController{
    constructor(
        private _movieService:IMovieService
    ){}

    async findMovies(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          
           const query=req.query.query as string;
           const page=Number(req.query.page)
           const movies=await this._movieService.findMovies(query,page) 
           SuccessResponse(res,MESSAGES.ACTION_SUCCESS,movies,HttpStatus.OK)
        } catch (error) {
            next(error)
        }
    }
    async addToFavourites(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const movie=req.body as Movie;
            const result=await this._movieService.addFavourite(movie);
            SuccessResponse(res,MESSAGES.ACTION_SUCCESS,result,HttpStatus.OK)
        } catch (error) {
            next(error)
        }
    }
    async removeFavourite(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const  imdbID  = req.params.imdbID as string;
            const removedMovie=await this._movieService.removeFavourite(imdbID)
            SuccessResponse(res,MESSAGES.ITEM_REMOVED,removedMovie,HttpStatus.OK)
        } catch (error) {
            next(error)
        }
    }
}