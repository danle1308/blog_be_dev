import { Request, Response, NextFunction } from "express";
import { redis } from "../../config/redis/redis.js";

export const checkOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { otpToken, otp } = req.body;
    if (!otpToken || !otp) {
        return res.status(400).json({ error: "Missing otpToken or otp" });
    }
    try {
        const dataGet = await redis.get(otpToken)
        if (!dataGet) {
            return res.status(400).json({
                message: 'OTP expired or invalid token',
                errorCode: 1,
            })
        }

        const { userName, email, otp: storedOtp, password } = typeof dataGet === "string" ? JSON.parse(dataGet) : dataGet;

        if (storedOtp !== otp) {
            return res.status(400).json({
                message: 'Invalid OTP',
                errorCode: 1,
            })
        }

        req.body = { userName, email, password };

        await redis.del(otpToken);

        next();
    } catch (error) {
        next(error)
    }
}