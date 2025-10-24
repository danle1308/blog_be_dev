import express from "express"
import { CollectionController } from "../app/controllers/collection/index.js";
import { checkEmailAndPasswordExist } from "../app/middlewares/checkEmailAndPasswordExist.js";
import { checkOtp } from "../app/middlewares/checkOtp.js";
import { authMiddleware } from "../app/middlewares/authMiddleware.js";

const router = express.Router();

// get all collection
router.get('/', authMiddleware, CollectionController.getAllCollection)

// create collection
// NEED jwt token, boardId, title
router.post('/create', authMiddleware, CollectionController.handleCreateCollection)

// delete collection
// NEED jwt token, boardId, collectionId
router.delete('/delete', authMiddleware, CollectionController.handleDeleteCollection)


export default router