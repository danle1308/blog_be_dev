import { Request, Response, NextFunction } from "express";
import { User } from "../../../models/User.js";
import bcrypt from "bcryptjs";

export const getDataUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataReceived = req.user;
        console.log('dataReceived', dataReceived?.userId);

        res.json({
            dataReceived,
            message: 'getDataUserByIdUser success',
        })
    } catch (error) {
        next(error);
    }
}