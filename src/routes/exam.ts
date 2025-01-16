import { Router } from "express";
import { createExam, deleteExam, getExamDetail, getExamQuestion, submitExam } from "../controller/exam";

const examRouter = Router()

// create exam
examRouter.post('/', createExam)

examRouter.delete('/:id', deleteExam)

examRouter.get('/:id', getExamDetail)

examRouter.post('/:id', submitExam)

examRouter.get('/:id/questions', getExamQuestion)

export default examRouter