import { Request, Response, NextFunction } from "express";
import { User } from "../../../models/User.js";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../../../../services/sendOtpEmail.js";
import { randomUUID } from "crypto";
import { redis } from "../../../../config/redis/redis.js";

let otp = Math.floor(100000 + Math.random() * 900000).toString();

export const handleRequestOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, email, password } = req.body
        const normalizedEmail = email.trim().toLowerCase();
        const otpToken = `otp:${randomUUID()}`;
        await redis.set(otpToken, JSON.stringify({
            userName: userName,
            email: normalizedEmail,
            password: password,
            otp,
        }), { ex: 600 });
        await sendOtpEmail(normalizedEmail, otp);
        return res.json({
            message: "OTP sent to email",
            otpToken
        });
    } catch (error) {
        next(error)
    }
}