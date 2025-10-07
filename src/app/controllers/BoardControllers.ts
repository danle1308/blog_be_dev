import { Board } from "../models/Board.js";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { ROLE } from "../constants/role.js";

class BoardControllers {

    async index(req: Request, res: Response) {
        
        try {
            const courses = await Board.find({});
            res.json(courses)
        } catch (err) {
            res.status(400).json({ err: "Error!!!" })
        }
    }

    async handlerDeleteBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const deleteById = await Board.deleteOne({ _id: id })
            if (!deleteById) {
                res.status(404).json({ message: 'Courses not found' });
            }
            res.status(200).json({
                deleteById,
                message: 'Delete Course Success!'
            });
        } catch (error) {
            next(error)
        }
    }

    async handlerCreateBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const title = req.body.nameBoard;
            const userIdCreate = req.user?.userId;
            const onCreate = await Board.create({
                nameBoard: title,
                ownerBoard: userIdCreate,
                members: [
                    {
                        user: userIdCreate,
                        role: ROLE.ADMIN,
                    }
                ]
            })
            res.status(200).json({
                onCreate,
                message: 'Create board Success!',
                errorCode: 0,
            });
        } catch (error) {
            next(error)
        }
    }


}

export default new BoardControllers();