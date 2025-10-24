import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Collection } from "../../../models/Collection.js";
import { User } from "../../../models/User.js";
import { Board } from "../../../models/Board.js";

export const getAllCollection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardId = req.body?.boardId;
        const collections = await Board.findById(boardId, null, { __v: 0 }).populate("task").lean()
        console.log(collections)
        res.status(200).json({
            collections,
            message: "get all collection success!"
        })
    } catch (error) {
        next(error)
    }
}