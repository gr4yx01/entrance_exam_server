import { Request, Response } from "express";
import { prisma } from "../db";

const createExam = async (req: Request, res: Response) => {
    const { name, description } = req.body

    try {
        const res = await prisma.exam.create({
            data: {
                name,
                description
            }
        })

        res.status(201).json({ message: 'Exam created', data: res })
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

const deleteExam = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const res = await prisma.exam.delete({
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
        const res = await prisma.exam.findUnique({
            where: {
                id: id
            }
        })

        res.status(200).json({ message: 'Exam detail', data: res })

    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

const submitExam = async (req: Request, res: Response) => {
    const { id } = req.params
    const { score } = req.body
    // include req.userId

    
    try {
        const submittedExam = await prisma.registration.update({
            where: {
                
            },
            data: {
                examId: id,
                userId: '',
                score
            }
        })

        res.status(201).json({ message: 'Exam submitted', data: submittedExam })

    } catch (err) {
        res.status(500).json({ message: 'An error occured' })
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
            }
        })

        res.status(200).json({ message: 'Exam questions', data: questions })
    } catch (err) {
        res.status(500).json({ message: 'An error occured' })
    }
}

export {
    createExam,
    deleteExam,
    getExamDetail,
    submitExam,
    getExamQuestion
}