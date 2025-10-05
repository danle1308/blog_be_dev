import express from "express"
import userControllers from "../app/controllers/UserController.js";

const router = express.Router();

// get all user data
router.get('/', userControllers.index)

// get all course data by id user
router.get('/getCourseByIdUser/:idUser', userControllers.getCoursesByIdUser)

// create user
router.post('/create', userControllers.handlerCreateUser)

// create user
router.get('/auth/register', userControllers.handlerRequestOtp)

export default router