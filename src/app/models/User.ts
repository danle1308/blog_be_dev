import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    courseId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            default: [],
        }
    ]
    
})

export const User = mongoose.model("User", UserSchema);