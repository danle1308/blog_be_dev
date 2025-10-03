import { Course } from "../models/Course.js";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";

class SourceControllers {

    
    async index(req: Request, res: Response) {
        
        try {
            const courses = await Course.find({});
            res.json(courses)
        } catch (err) {
            res.status(400).json({ err: "Error!!!" })
        }
    }

    async handlerPost(req: Request, res: Response, next: NextFunction) {
        try {
            const idUser = req.params.userId;
            const coursesData = req.body;

            const onCreate = await Course.create({
                ...coursesData,
                owner: idUser,
            })

            const updateCoursesId = await User.findByIdAndUpdate(
                idUser,
                { $push: { courseId: onCreate._id } },
                { new: true }
            )

            res.status(200).json({ onCreate, updateCoursesId, message: 'Create courses success!', errorCode: 0 })
        } catch (error) {
            next(error)
        }
    }

    async getOwnerById(req: Request, res: Response, next: NextFunction) {
        try {
            // const idUser = req.params.userId;

            const dataUser = await Course.find().populate("owner")
            res.status(200).json({ dataUser, message: 'get data success!', errorCode: 0 })
        } catch (error) {
            next(error)
        }
    }

    async handlerUpdateOneField(req: Request, res: Response, next: NextFunction) {
        try {
            const dataUpdate = req.body
            const id = req.params.id;

            const updated = await Course.findByIdAndUpdate(
                id,
                { $set: dataUpdate },
                { new: true, runValidators: true },
            )

            if (!updated) {
                res.status(404).json({ message: 'Courses not found' });
            }
            res.json(updated);
        } catch (err) {
            next(err)
        }
    }

    async handlerUpdateAllFields(req: Request, res: Response, next: NextFunction) {
        
    }

    async handlerDeleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const deleteById = await Course.deleteOne({ _id: id })
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

export default new SourceControllers();