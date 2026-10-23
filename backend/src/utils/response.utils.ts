import { Response } from "express";
import { ApiResponse } from "../types/response.types";
import { HttpStatus } from "../constants/constants";

export const SuccessResponse = <T = unknown>(
    res: Response,
    message?: string,
    data?: T,
    statusCode: number = HttpStatus.OK
): void => {
    const response: ApiResponse<T> = {
        success: true,
    }
    if (message) {
        response.message = message
    }
    if (data != undefined) {
        response.data = data;
    }
    res.status(statusCode).json(response)

}