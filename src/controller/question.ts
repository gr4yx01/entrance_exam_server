import { Response, Request } from "express";
import { prisma } from "../db";

const getExamQuestions = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const result = await prisma.question.findMany({
            where: {
                examId: id
            },
            include: {
                options: true
            }
        })

        res.status(200).json({ message: 'Questions', data: result })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

const addQuestion = async (req: Request, res: Response) => {
    const { id } = req.params
    const { question, options, correct } = req.body

    console.log(req.body)
    
    try {
        const result = await prisma.question.create({
            data: {
                question,
                correct,
                examId: id
            }
        })

        await prisma.option.createMany({
            data: options.map((option: string) => {
                return {
                    option,
                    questionId: result.id
                }
            })
        })

        res.status(201).json({ message: 'Question added' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

const deleteQuestion = async (req: Request, res: Response) => {
    const { questionId } = req.params

    try {
        await prisma.question.delete({
            where: {
                id: questionId
            }
        })

        res.status(200).json({ message: 'Question deleted' })
    } catch (err) {
        res.status(500).json({ message: 'Error occurred' })
    }
}

export {
    addQuestion,
    deleteQuestion,
    getExamQuestions
}