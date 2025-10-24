import { Request, Response, NextFunction } from "express";
import { User } from "../../../models/User.js";
import bcrypt from "bcryptjs";
import { createJwtToken } from "../../../../services/jwtService.js";

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const dataByEmail = await User.findOne({ email: email.trim().toLowerCase() })
        if (!dataByEmail) {
            return res.status(400).json({
                message: 'Email not found',
                errorCode: 1,
            })
        }
        const isMatchPassword = await bcrypt.compare(password, dataByEmail.password)
        if (!isMatchPassword) {
            return res.status(400).json({
                message: 'Password is wrong',
                errorCode: 1,
            })
        }
        const userIdDb = dataByEmail._id.toString();
        const userEmail = dataByEmail.email;
        const getJwtToken = createJwtToken({
            userId: userIdDb,
            email: userEmail,
        })
        res.status(200).json({
            jwtToken: getJwtToken,
            message: 'Login success!',
            errorCode: 0,
        })
    } catch (error) {
        next(error)
    }
}