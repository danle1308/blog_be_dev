import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.js";

export const checkEmailExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Email already exists" });
        }
        next();
    } catch (err) {
        next(err);
    }
}