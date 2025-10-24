import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Collection } from "../../../models/Collection.js";
import { useCheckRole } from "../../../helper/useCheckRole.js";
import { Board } from "../../../models/Board.js";


export const handleCreateCollection = async (req: Request, res: Response, next: NextFunction) => {
    const sessionCreate = await mongoose.startSession();
    sessionCreate.startTransaction();

    try {
        const userId = req.user?.userId;
        const { boardId, title } = req.body;

        if (!userId || !boardId || !title) {
            await sessionCreate.abortTransaction();
            return res.status(400).json({
                message: "Missing required fields (userId, boardId, title)",
                errorCode: 1,
            });
        }

        const { isAdmin } = await useCheckRole(boardId, userId!);

        if (!isAdmin) {
            await sessionCreate.abortTransaction();
            return res.status(400).json({
                message: "You do not have permission, please update your permissions!",
                errorCode: 1,
            })
        }

        const collection = await Collection.create(
            [{ titleCollection: title }],
            { session: sessionCreate }
        );
        const collectionIds = collection.map(item => item._id);

        await Board.findByIdAndUpdate(
            boardId,
            { $push: { boardCollection: { $each : [ collectionIds ] } } },
            { session: sessionCreate }
        );
        
        await sessionCreate.commitTransaction();

        return res.status(200).json({
            collection,
            message: "create collection success!",
            errorCode: 0,
        })
    } catch (error) {
        await sessionCreate.abortTransaction();
        next(error)
    } finally {
        await sessionCreate.endSession();
    }
}