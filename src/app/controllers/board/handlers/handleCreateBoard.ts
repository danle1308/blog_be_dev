import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Board } from "../../../models/Board.js";
import { User } from "../../../models/User.js";
import { ROLE } from "../../../constants/role.js";

export const handleCreateBoard = async (req: Request, res: Response, next: NextFunction) => {
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
        const boardId = board?._id;
        await board.save({ session: sessionCreate })
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