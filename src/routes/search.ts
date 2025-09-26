import express from "express";
import searchControllers from "../app/controllers/SearchControllers.js"

const router = express.Router();

router.get('/', searchControllers.index)

export default router