import { Express } from "express-serve-static-core"
import searchRouter from "./search.js"
import sourceRouter from "./sources.js"
import updateRouter from "./update.js"
import userRouter from "./user.js"

function routes(app: Express) {
    app.use('/search', searchRouter);
    
    app.use('/sources', sourceRouter);

    app.use('/update', updateRouter);

    app.use('/user', userRouter);
}

export default routes