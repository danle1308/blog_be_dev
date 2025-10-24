import { Request, Response, NextFunction } from "express";
import { User } from "../../../models/User.js";
import bcrypt from "bcryptjs";

export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const onRegister = await User.create({ userName, email, password: hashedPassword })
        res.status(200).json({
            onRegister,
            message: 'Register success!',
            errorCode: 0,
        })
    } catch (error) {
        next(error)
    }
}