import express from "express"
// import boardControllers from "../app/controllers/BoardControllers.js";
import { BoardController } from "../app/controllers/board/index.js";
import { authMiddleware } from "../app/middlewares/authMiddleware.js";

const router = express.Router();

// get all board by userId
// router.get('/', BoardController.index)

// create new board
// NEED nameBoard, jwt token
router.post('/create', authMiddleware, BoardController.handleCreateBoard)

// update board
// NEED boardId, nameBoard, jwt token
router.patch('/update', authMiddleware, BoardController.handleUpdateBoard)

// delete board
// NEED boardId, jwt token
router.delete('/delete', authMiddleware, BoardController.handleDeleteBoard)


export default router