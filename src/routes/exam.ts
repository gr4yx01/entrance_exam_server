import { Router } from "express";
import { createExam, deleteExam, getExamDetail, getExamQuestion, participateInExam, submitExam } from "../controller/exam";
import { isAdmin, verifyToken } from "../middleware/auth";

const examRouter = Router()

// create exam
examRouter.post('/', verifyToken, isAdmin, createExam)

examRouter.delete('/:id', verifyToken, isAdmin, deleteExam)

examRouter.get('/:id', getExamDetail)

examRouter.post('/:id', submitExam)

examRouter.post('/:id/participate', participateInExam)

examRouter.get('/:id/questions', getExamQuestion)

export default examRouter