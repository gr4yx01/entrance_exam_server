import express, { json } from 'express'
import cors from 'cors'
import examRouter from './routes/exam'
import questionRouter from './routes/question'
import authRouter from './routes/auth'
// import registrationRouter from './routes/registration'

const app = express()

app.use(cors())
app.use(json())

app.use('/auths', authRouter)
app.use('/exams', examRouter)
app.use('/questions', questionRouter)
// app.use('/registration', registrationRouter)

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})