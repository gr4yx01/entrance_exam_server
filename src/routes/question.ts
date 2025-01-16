import { Router } from "express";
import { addQuestion, deleteQuestion } from "../controller/question";
import { isAdmin, verifyToken } from "../middleware/auth";

const questionRouter = Router()

questionRouter.post('/:examId', verifyToken, isAdmin, addQuestion)

questionRouter.delete('/:questionId', verifyToken, isAdmin, deleteQuestion)

export default questionRouter