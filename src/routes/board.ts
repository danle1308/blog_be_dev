import express from "express"
import boardControllers from "../app/controllers/BoardControllers.js";
import { authMiddleware } from "../app/middlewares/authMiddleware.js";

const router = express.Router();

// get all board by userId
router.get('/', boardControllers.index)

// create new board
router.post('/create', authMiddleware, boardControllers.handlerCreateBoard)

// delete board
router.delete('/delete', authMiddleware, boardControllers.handlerDeleteBoard)


export default router