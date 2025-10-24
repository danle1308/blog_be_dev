import { Express } from "express-serve-static-core"
import boardRouter from "./board.js"
import updateRouter from "./update.js"
import userRouter from "./user.js"
import collectionRouter from "./collection.js"

function routes(app: Express) {
    app.use('/user', userRouter);
    
    app.use('/board', boardRouter);
    
    app.use('/update', updateRouter);

    app.use('/collection', collectionRouter);
}

export default routes