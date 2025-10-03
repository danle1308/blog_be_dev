import { Request, Response } from "express";

class UpdateControllers {
    index(req: Request, res: Response) {
        res.render('update');
    }


    

}

export default new UpdateControllers();