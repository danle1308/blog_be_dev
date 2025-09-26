import express from "express"
import sourceControllers from "../app/controllers/SourceControllers.js";

const router = express.Router();

router.get('/', sourceControllers.index)

export default router