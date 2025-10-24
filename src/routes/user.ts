import express from "express"
// import userControllers from "../app/controllers/UserController.js";
import { UserController } from "../app/controllers/user/index.js";
import { checkEmailAndPasswordExist } from "../app/middlewares/checkEmailAndPasswordExist.js";
import { checkOtp } from "../app/middlewares/checkOtp.js";
import { authMiddleware } from "../app/middlewares/authMiddleware.js";

const router = express.Router();

// get all users
// router.get('/', UserController.index)

// get all data by id user
router.get('/profile', authMiddleware, UserController.getDataUser)

// send otp step 1
// NEED userName, email, password
router.post('/send-otp', checkEmailAndPasswordExist, UserController.handleRequestOtp)

// create user step 2
// NEED otpToken, otp from email
router.post('/register', checkOtp, UserController.handleRegister)

// login for user
router.post('/login', UserController.handleLogin)

export default router