import { Response, Request } from "express";

const register = async (req: Request, res: Response) => {
    res.send('Add Question')
}

export {
    register
}