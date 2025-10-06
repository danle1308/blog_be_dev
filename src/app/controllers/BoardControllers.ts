import { Board } from "../models/Board.js";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";

class BoardControllers {

    async index(req: Request, res: Response) {
        
        try {
            const courses = await Board.find({});
            res.json(courses)
        } catch (err) {
            res.status(400).json({ err: "Error!!!" })
        }
    }

    async handlerDeleteOne(req: Request, res: Response, next: NextFunction) {
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
}

export default new BoardControllers();