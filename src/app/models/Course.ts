import mongoose from "mongoose";
import { ref } from "process";

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
})

export const Course = mongoose.model("Course", CourseSchema);