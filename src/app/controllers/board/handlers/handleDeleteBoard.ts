import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Board } from "../../../models/Board.js";
import { User } from "../../../models/User.js";
import { useCheckRole } from "../../../helper/useCheckRole.js";


export const handleDeleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    const sessionDelete = await mongoose.startSession();
    sessionDelete.startTransaction();
    try {
        const userId = req.user?.userId;
        const boardId = req.body.boardId;
        const isAdmin = await useCheckRole(boardId, userId!);
        if (!isAdmin) {
            return res.status(401).json({
                message: "You are not an admin. Please upgrade your permissions."
            })
        }
        await Board.findByIdAndDelete(
            boardId,
            { session: sessionDelete },
        )
        const onDelete = await User.findByIdAndUpdate(
            userId,
            { $pull: { createdBoard: boardId } },
            { session: sessionDelete, new: true }
        )
        await sessionDelete.commitTransaction();
        res.status(200).json({
            onDelete,
            message: 'Delete Board Success!',
            errorCode: 0,
        });
    } catch (error) {
        await sessionDelete.abortTransaction();
        next(error)
    } finally {
        await sessionDelete.endSession();
    }
}