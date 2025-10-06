import express from "express"
import userControllers from "../app/controllers/UserController.js";
import { checkEmailExist } from "../app/middlewares/checkEmailExist.js";
import { checkOtp } from "../app/middlewares/checkOtp.js";

const router = express.Router();

// get all user data
router.get('/', userControllers.index)

// get all course data by id user
router.get('/getCourseByIdUser/:idUser', userControllers.getCoursesByIdUser)

// send otp
router.post('/auth/send-otp', checkEmailExist, userControllers.handlerRequestOtp)

// create user
router.post('/auth/register', checkOtp, userControllers.handlerRegister)

// create user
router.post('/auth/login', userControllers.handlerLogin)

export default router