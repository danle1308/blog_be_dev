import express from "express"
import userControllers from "../app/controllers/UserController.js";
import { checkEmailExist } from "../app/middlewares/checkEmailExist.js";
import { checkOtp } from "../app/middlewares/checkOtp.js";
import { authMiddleware } from "../app/middlewares/authMiddleware.js";

const router = express.Router();

// get all users
router.get('/', userControllers.index)

// get all data by id user
router.get('/auth/profile', authMiddleware, userControllers.getDataUserByIdUser)

// send otp
router.post('/auth/send-otp', checkEmailExist, userControllers.handlerRequestOtp)

// create user
router.post('/auth/register', checkOtp, userControllers.handlerRegister)

// login for user
router.post('/auth/login', userControllers.handlerLogin)

export default router