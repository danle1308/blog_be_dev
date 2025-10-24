import mongoose from "mongoose";

export function useConvertType(id?: string): mongoose.Types.ObjectId | null {
    if (!id) return null;
    return new mongoose.Types.ObjectId(id);
}