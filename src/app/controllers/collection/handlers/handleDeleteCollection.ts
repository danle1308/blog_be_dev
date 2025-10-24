import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Collection } from "../../../models/Collection.js";
import { User } from "../../../models/User.js";
import { useCheckRole } from "../../../helper/useCheckRole.js";
import { Board } from "../../../models/Board.js";


export const handleDeleteCollection = async (req: Request, res: Response, next: NextFunction) => {
    const sessionDelete = await mongoose.startSession();
    sessionDelete.startTransaction();

    try {
        const userId = req.user?.userId;
        const { boardId, collectionId } = req.body;

        if (!userId || !boardId || !collectionId ) {
            await sessionDelete.abortTransaction();
            return res.status(400).json({
                message: "Missing required fields (userId, boardId, collectionId)",
                errorCode: 1,
            });
        }
        const { isAdmin } = await useCheckRole(boardId, userId!);
        if (!isAdmin) {
            await sessionDelete.abortTransaction();
            return res.status(400).json({
                message: "You do not have permission, please update your permissions!",
                errorCode: 1,
            })
        }
        const onDelete = await Board.findByIdAndUpdate(
            boardId,
            { $pull: { boardCollection: collectionId } },
            { 
                new: true,
                session: sessionDelete,
            }
        )
        await Collection.findByIdAndDelete(
            collectionId,
            { session: sessionDelete }
        )
        await sessionDelete.commitTransaction();
        return res.status(200).json({
            onDelete,
            message: "delete collection success!",
            errorCode: 0,
        })
    } catch (error) {
        await sessionDelete.abortTransaction();
        next(error)
    } finally {
        await sessionDelete.endSession();
    }
}