import express from "express"
import boardControllers from "../app/controllers/BoardControllers.js";

const router = express.Router();

// get all data
router.get('/', boardControllers.index)


export default router