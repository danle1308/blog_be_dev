import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdBoard: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            default: [],
        }
    ],
    joinBoard: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            default: [],
        }
    ],
})

export const User = mongoose.model("User", UserSchema);