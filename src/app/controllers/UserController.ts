import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { redis } from '../../config/redis/redis.js';
import { sendOtpEmail } from "../../services/sendOtpEmail.js";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

let otp = Math.floor(100000 + Math.random() * 900000).toString();

class UserControllers {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = await User.find({})
            res.status(200).json(userData)
        } catch (error) {
            next(error)
        }
    }

    async getCoursesByIdUser(req: Request, res: Response, next: NextFunction) {
        try {
            const idUser = req.params.idUser;
            const courseDataByIdUser = await User.findById(idUser).populate("courseId")
            res.status(200).json({ courseDataByIdUser, message: 'get data success!', errorCode: 0 })
        } catch (error) {
            next(error)
        }
    }

    async handlerRequestOtp(req: Request, res: Response, next: NextFunction) {

        try {
            const { userName, email, password } = req.body
            const normalizedEmail = email.trim().toLowerCase();

            const otpToken = `otp:${randomUUID()}`;

            const setData = await redis.set(otpToken, JSON.stringify({
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


    async handlerRegister(req: Request, res: Response, next: NextFunction) {

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

    async handlerLogin(req: Request, res: Response, next: NextFunction) {

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
                console.log('sai pass')
                return res.status(400).json({
                    message: 'Password is wrong',
                    errorCode: 1,
                })
            }
            res.status(200).json({
                message: 'Login success!',
                errorCode: 0,
            })
        } catch (error) {
            next(error)
        }
    }




}

export default new UserControllers();