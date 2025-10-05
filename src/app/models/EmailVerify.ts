import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EmailVerifySchema = new Schema({
    email: { type: String, required: true },
    otp: { type: Number, required: true },
    expiresAt: { type: Date, default: Date.now() },
    
    
})

export const User = mongoose.model("EmailVerify", EmailVerifySchema);