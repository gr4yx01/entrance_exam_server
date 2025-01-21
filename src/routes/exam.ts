import { Router } from "express";
import { createExam, deleteExam, getAllExam, getAllRegisteredStudents, getExamDetail, getExamQuestion, getResult, participateInExam, submitExam } from "../controller/exam";
import { isAdmin, verifyToken } from "../middleware/auth";

const examRouter = Router()

// create exam
examRouter.post('/', verifyToken, isAdmin, createExam)

examRouter.delete('/:id', verifyToken, isAdmin, deleteExam)

examRouter.get('/students', getAllRegisteredStudents)

// examRouter.get('/:id', getExamDetail)

examRouter.post('/:id/submit', submitExam)

examRouter.post('/:id/participate', verifyToken, participateInExam)

examRouter.get('/', getAllExam)

examRouter.get('/result', verifyToken, getResult)

export default examRouter