import express from "express"
import updateControllers from "../app/controllers/UpdateControllers.js";

const router = express.Router();

router.get('/', updateControllers.index)
// router.get('/create', sourceControllers.create)
// router.post('/post', sourceControllers.handlerPost)

export default router