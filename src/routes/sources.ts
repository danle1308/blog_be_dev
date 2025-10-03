import express from "express"
import sourceControllers from "../app/controllers/SourceControllers.js";

const router = express.Router();

// get all data
router.get('/', sourceControllers.index)

// render create
router.post('/create/:userId', sourceControllers.handlerPost)

// get data by id
router.get('/getOwner/:userId', sourceControllers.getOwnerById)

// update #1
router.put('/:id', sourceControllers.handlerUpdateOneField)

// update #2
router.put('/:id', sourceControllers.handlerUpdateAllFields)

// delete base id
router.delete('/:id', sourceControllers.handlerDeleteOne)

export default router