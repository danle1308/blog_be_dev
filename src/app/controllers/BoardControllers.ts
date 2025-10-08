import { Board } from "../models/Board.js";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { ROLE } from "../constants/role.js";
import mongoose from "mongoose";

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

        const sessionDelete = await mongoose.startSession();
        sessionDelete.startTransaction();

        try {
            const userId = req.user?.userId;
            const dataOfUser = await User.findOne({ _id: userId })

            console.log('dataOfUser', dataOfUser)
            
            res.status(200).json({
                message: 'Delete Course Success!'
            });
        } catch (error) {
            next(error)
        }
    }

    async handlerCreateBoard(req: Request, res: Response, next: NextFunction) {
        const sessionCreate = await mongoose.startSession();
        sessionCreate.startTransaction();
        try {
            const title = req.body.nameBoard;
            const userIdCreate = req.user?.userId;
            const board = new Board(
                {
                    nameBoard: title,
                    ownerBoard: userIdCreate,
                    members: [
                        {
                            user: userIdCreate,
                            role: ROLE.ADMIN,
                        }
                    ]
                }
            );
            await board.save({ session: sessionCreate })
            const boardId = board?._id;
            const onUpdateToUser = await User.findByIdAndUpdate(
                userIdCreate,
                { $push: { createdBoard: boardId } },
                { new: true, session: sessionCreate },
            )
            await sessionCreate.commitTransaction();
            res.status(200).json({
                board,
                message: 'Create board Success!',
                errorCode: 0,
            });
        } catch (error) {
            await sessionCreate.abortTransaction();
            next(error)
        } finally {
            sessionCreate.endSession();
        }
    }


}

export default new BoardControllers();