import { Router } from "express";
import { addQuestion } from "../controller/question";

const questionRouter = Router()

questionRouter.post('/:examId', addQuestion)

questionRouter.delete('/:examId/:questionId', addQuestion)