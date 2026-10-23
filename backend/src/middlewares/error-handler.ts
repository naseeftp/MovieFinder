import { Request,Response,NextFunction } from "express";
import { AppError } from "../errors/appError";
import { HttpStatus } from "../constants/constants";
import MESSAGES from "../constants/message.constant";
export const errorHandler=(err: Error | AppError, req: Request, res: Response, _next: NextFunction):void=>{
 if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
        return
    }
    if (err.name === 'ValidationError') {
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: err.message
        })
        return
    }
    if (err.name === 'CastError') {
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: MESSAGES.INVALID_ID
        })
        return
    }
    const message = err instanceof Error ? err.message : MESSAGES.SERVER_ERROR
    res.status(HttpStatus.INTERNAL_ERROR).json({
        success: false,
        message: message
    })


}