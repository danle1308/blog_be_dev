import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    nameBoard: { type: String, maxLength: 255, required: true },
    boardCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection",
            default: [],
        }
    ]
    ,
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        }
    ],
})

export const Board = mongoose.model("Board", BoardSchema);