import { Response, Request } from "express";

const addQuestion = async (req: Request, res: Response) => {
    res.send('Add Question')
}

export {
    addQuestion
}