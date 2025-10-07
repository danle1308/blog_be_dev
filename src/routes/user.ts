import express from "express"
import userControllers from "../app/controllers/UserController.js";
import { checkEmailAndPasswordExist } from "../app/middlewares/checkEmailAndPasswordExist.js";
import { checkOtp } from "../app/middlewares/checkOtp.js";
import { authMiddleware } from "../app/middlewares/authMiddleware.js";

const router = express.Router();

// get all users
router.get('/', userControllers.index)

// get all data by id user
router.get('/profile', authMiddleware, userControllers.getDataUserByIdUser)

// send otp
router.post('/send-otp', checkEmailAndPasswordExist, userControllers.handlerRequestOtp)

// create user
router.post('/register', checkOtp, userControllers.handlerRegister)

// login for user
router.post('/login', userControllers.handlerLogin)

export default router