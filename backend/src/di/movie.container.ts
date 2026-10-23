import { MovieRepository } from "../repositories/implimentations/Movie.repository";
import { MovieService } from "../services/implimentations/Movie.service";
import { MovieController } from "../controllers/implimentations/Movie.controller";

const movieRepo=new MovieRepository();
const movieService=new MovieService(movieRepo);
export const movieController=new MovieController(movieService)