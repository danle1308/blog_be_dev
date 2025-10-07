import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.js";
import { checkPasswordUsed } from "../helper/checkPasswordUsed.js";

export const checkEmailAndPasswordExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password is required" });
        }
        const emailUser = await User.findOne({ email });
        const passwordUsers = await User.find({});
        const getArrPassword = passwordUsers.map((user) => user.password)
        const isUsed = await checkPasswordUsed(password, getArrPassword)
        if (emailUser || isUsed) {
            return res.status(409).json({ 
                message: "Email or Password already exists",
                errorCode: 1,
            });
        }
        next();
    } catch (err) {
        next(err);
    }
}