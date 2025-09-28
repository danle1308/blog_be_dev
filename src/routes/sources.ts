import express from "express"
import sourceControllers from "../app/controllers/SourceControllers.js";

const router = express.Router();

router.get('/', sourceControllers.index)
router.get('/create', sourceControllers.create)
router.post('/post', sourceControllers.handlerPost)

export default router