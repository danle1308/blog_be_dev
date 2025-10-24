import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    titleCollection: { type: String, maxLength: 255, required: true },
    task: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            default: [],
        }
    ],
})

export const Collection = mongoose.model("Collection", CollectionSchema);