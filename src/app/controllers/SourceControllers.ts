import { Course } from "../models/Course.js";
import { Request, Response } from "express";

class SourceControllers {

    async index(req: Request, res: Response) {
        try {
            const courses = await Course.find({});
            res.json(courses)
        } catch (err) {
            res.status(400).json({ err: "Error!!!" })
        }
    }
}

export default new SourceControllers();