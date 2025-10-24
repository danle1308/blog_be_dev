import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Board } from "../../../models/Board.js";
import { useCheckRole } from "../../../helper/useCheckRole.js";

export const handleUpdateBoard = async (req: Request, res: Response, next: NextFunction) => {
    const sessionUpdate = await mongoose.startSession();
    sessionUpdate.startTransaction();
    try {
        const boardId = req.body?.boardId;
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Missing user ID" });
        const isAdmin = await useCheckRole(boardId, userId)
        if (!isAdmin) {
            return res.status(401).json({
                message: "You are not an admin or Board is not found"
            })
        }
        const updatedBoard = await Board.findByIdAndUpdate(
            boardId,
            {
                $set: { nameBoard: req.body.nameBoard }
            },
            {
                new: true,
                session: sessionUpdate
            },
        )
        await sessionUpdate.commitTransaction();
        return res.status(200).json({
            updatedBoard,
            message: "Update success",
            errorCode: 0,
        });
    } catch (error) {
        await sessionUpdate.abortTransaction();
        next(error)
    } finally {
        await sessionUpdate.endSession();
    }
}