import { Request, Response, NextFunction } from "express";
export interface IMovieController {
    findMovies(req: Request, res: Response, next: NextFunction): Promise<void>
    addToFavourites(req: Request, res: Response, next: NextFunction): Promise<void>
    removeFavourite(req: Request, res: Response, next: NextFunction): Promise<void>
}