import { Request, Response } from "express";
import { prisma } from "../db";
import jwt from 'jsonwebtoken'
import * as argon from 'argon2'

const loginAsAdministrator = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const admin = await prisma.admin.findFirst({
            where: {
                username
            }
        })

        if(!admin) {
            res.status(404).json({
                message: 'No such account'
            })
            return
        }

        const isPasswordMatch = await argon.verify(admin.password, password)

        if(!isPasswordMatch) {
            res.status(401).json({
                message: 'Invalid credentials'
            })
            return
        }

        const secret = process.env.JWT_SECRET

        const payload = {
            role: 'ADMIN',
            userId: admin.id
        }

        if(secret) {
            const token = jwt.sign(payload, secret, {
                expiresIn: '10h'
            })
            res.status(200).json({
                access_token: token,
            })
        }

    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const registerAsAdministrator = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const adminExist = await prisma.admin.findFirst({
            where: {
                username
            }
        })

        if(adminExist) {
            res.status(400).json({
                message: 'Admin already exists'
            })
            return
        }

        const hashedPassword = await argon.hash(password)
        
        const admin = await prisma.admin.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        const secret = process.env.JWT_SECRET

        const payload = {
            role: 'ADMIN',
            userId: admin?.id
        }


        if(secret) {
            const token = jwt.sign(payload, secret, {
                expiresIn: '10h'
            })
            res.status(201).json({
                access_token: token,
            })
        }
        

    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const studentLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const student = await prisma.student.findFirst({
            where: {
                username
            }
        })

        if(!student) {
            res.status(404).json({
                message: 'Student not found'
            })
            return
        }

        const isPasswordMatch = await argon.verify(student.password, password)

        if(!isPasswordMatch) {
            res.status(401).json({
                message: 'Invalid credentials'
            })
            return
        }

        const secret = process.env.JWT_SECRET

        const payload = {
            role: 'STUDENT',
            userId: student.id
        }

        if(secret) {
            const token = jwt.sign(payload, secret, {
                expiresIn: '10h'
            })
            res.status(200).json({
                access_token: token,
            })
        }

    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const studentRegistration = async (req: Request, res: Response) => {
    const { username, email, password, school, age } = req.body

    try {
        const userExist = await prisma.student.findFirst({
            where: {
                username
            }
        })

        if(userExist) {
            res.status(400).json({
                message: 'Admin already exists'
            })
            return
        }

        const hashedPassword = await argon.hash(password)

        const student = await prisma.student.create({
            data: {
                username,
                email,
                school,
                age,
                password: hashedPassword
            }
        })

        const secret = process.env.JWT_SECRET

        const payload = {
            role: 'STUDENT',
            userId: student?.id
        }

        if(secret) {
            const token = jwt.sign(payload, secret, {
                expiresIn: '10h'
            })
            res.status(201).json({
                access_token: token,
            })
        }
        

    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

export {
    loginAsAdministrator,
    registerAsAdministrator,
    studentLogin,
    studentRegistration
}