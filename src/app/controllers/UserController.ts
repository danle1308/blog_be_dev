import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";

class UserControllers {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = await User.find({})
            res.status(200).json(userData)
        } catch (error) {
            next(error)
        }
    }

    async getCoursesByIdUser(req: Request, res: Response, next: NextFunction) {
        try {
            const idUser = req.params.idUser;
            const courseDataByIdUser = await User.findById(idUser).populate("courseId")
            res.status(200).json({ courseDataByIdUser, message: 'get data success!', errorCode: 0 })
        } catch (error) {
            next(error)
        }
    }

    async handlerCreateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const value = req.body
            const create = await User.create(value)
            res.status(200).json(create)
        } catch (error) {
            next(error)
        }
    }


    

}

export default new UserControllers();