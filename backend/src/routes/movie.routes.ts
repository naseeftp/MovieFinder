import { Router } from "express";
import { movieController } from "../di/movie.container";

const router=Router();
router.get('/search',
    (req,res,next)=>movieController.findMovies(req,res,next)
)
router.post('/favorites',
    (req,res,next)=>movieController.addToFavourites(req,res,next)
)
router.delete('/favorites/:imdbID',
    (req,res,next)=>movieController.removeFavourite(req,res,next)
)
export default router
