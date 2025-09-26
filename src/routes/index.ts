import { Express } from "express-serve-static-core"
import searchRouter from "./search.js"
import sourceRouter from "./sources.js"

function routes(app: Express) {
    app.use('/search', searchRouter)
    
    app.use('/sources', sourceRouter)
}

export default routes