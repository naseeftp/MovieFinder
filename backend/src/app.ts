import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error-handler';
import movieRouter from './routes/movie.routes'

const app=express();
const allowedOrgins=process.env.CLIENT_URL
?.split(',')
.map((url)=>url.trim())
.filter(Boolean)??[]

app.use(cors({
    origin:allowedOrgins,
    methods:["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],

}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/movies',movieRouter)

app.use(errorHandler)
export default app
