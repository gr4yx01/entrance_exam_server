import { Request, Response } from "express";
import { prisma } from "../db";

const createExam = async (req: Request, res: Response) => {
    const { name, description, duration, noOfQuestions } = req.body

    try {
         await prisma.exam.create({
            data: {
                name,
                description,
                duration,
                noOfQuestions
            }
        })

        res.status(201).json({ message: 'Exam created' })
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

const deleteExam = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
         await prisma.exam.delete({
            where: {
                id: id
            }
        })

        res.status(200).json({ message: 'Exam deleted' })

    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

const getExamDetail = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const result = await prisma.exam.findUnique({
            where: {
                id: id
            }
        })

        res.status(200).json({ message: 'Exam detail', data: result })

    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

const submitExam = async (req: Request, res: Response) => {
    const { id } = req.params
    const { score } = req.body

    try {
        const submittedExam = await prisma.result.update({
            where: {
                id
                // examId,
                // studentId: req.userId
            },
            data: {
                // examId: examId,
                // studentId: req.userId,
                score
            }
        })

        res.status(201).json({ message: 'Exam submitted', data: submittedExam })

    } catch (err) {
        res.status(500).json({ message: err })
        console.log(err)
    }
}

const getExamQuestion = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const questions = await prisma.exam.findMany({
            where: {
                id
            },
            include: {
                questions: {
                    include: {
                        options: true
                    }
                }
            },
            orderBy: {

            }
        })

        const shuffleArray = (array: any) => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          };
          
          if (questions.length > 0) {
            questions[0].questions = shuffleArray(questions[0].questions);
          }

        res.status(200).json({ message: 'Exam questions', data: questions })
    } catch (err) {
        res.status(500).json({ message: 'An error occured' })
    }
}

const participateInExam = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const exam = await prisma.exam.findUnique({
            where: {
                id
            }
        })

        if (!exam) {
            res.status(404).json({ message: 'Exam not found' })
            return
        }

        const alreadyTaken = await prisma.result.findFirst({
            where: {
                examId: id,
                studentId: req.userId
            }
        })

        if(alreadyTaken) {
            res.status(400).json({ message: 'You have already taken this exam' })
            return
        }

        const result = await prisma.result.create({
            data: {
                examId: id,
                studentId: req.userId || '',
                score: 0
            }
        })

        res.status(201).json({ message: 'Exam started', data: result })

    } catch (err) {
        res.status(500).json({ error: err })
        console.log(err)
    }
}

const getAllExam = async (req: Request, res: Response) => {
    try {
        const exams = await prisma.exam.findMany({
            include: {
                questions: true
            }
        })

        res.status(200).json(exams)
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const getResult = async (req: Request, res: Response) => {
    try {
        const result = await prisma.result.findMany({
            where: {
                studentId: req.userId
            },
            include: {
                exam: true,
                student: true
            }
        })

        res.status(200).json({ data: result })
    } catch (err) {
        res.status(500).json({ message: 'An error occurred' })
    }
}

const getAllRegisteredStudents = async (req: Request, res: Response) => {
    try {
        const students = await prisma.student.findMany()

        res.status(200).json({ data: students })
    } catch (err) {
        res.status(500).json({ message: 'An error occurred' })
    }
}

export {
    createExam,
    deleteExam,
    getExamDetail,
    submitExam,
    getExamQuestion,
    participateInExam,
    getAllExam,
    getResult,
    getAllRegisteredStudents
}