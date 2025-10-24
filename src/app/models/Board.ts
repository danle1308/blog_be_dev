import mongoose from "mongoose";
import { ROLE } from "../constants/role.js";

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    nameBoard: { type: String, maxLength: 255, required: true },
    boardCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection",
            default: [],
        }
    ],
    ownerBoard:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ,
    members: [
        {
            _id: false,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            role: {
                type: Number,
                enum: Object.values(ROLE),
            },
        }
    ],
})

export const Board = mongoose.model("Board", BoardSchema);