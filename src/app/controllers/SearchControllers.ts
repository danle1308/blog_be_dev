import { Request, Response } from "express";

class SearchControllers {
    index(req: Request, res: Response) {
        res.render('search');
    }

}

export default new SearchControllers();