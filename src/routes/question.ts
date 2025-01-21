import { Router } from "express";
import { addQuestion, deleteQuestion, getExamQuestions } from "../controller/question";
import { isAdmin, verifyToken } from "../middleware/auth";

const questionRouter = Router()

questionRouter.post('/:id', verifyToken, isAdmin, addQuestion)

questionRouter.delete('/:questionId', verifyToken, isAdmin, deleteQuestion)

questionRouter.get('/exam/:id', getExamQuestions)

export default questionRouter