import { Course } from "../models/Course.js";
import { NextFunction, Request, Response } from "express";

class SourceControllers {

    async index(req: Request, res: Response) {
        try {
            const courses = await Course.find({});
            res.json(courses)
        } catch (err) {
            res.status(400).json({ err: "Error!!!" })
        }
    }

    create(req: Request, res: Response, next: NextFunction) {
        res.render('sources')
    }

    async handlerPost(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = new Course(req.body)
            await Course.create(courses)
            res.status(200).json(courses)
        } catch (error) {
            next(error)
        }
    }
}

export default new SourceControllers();