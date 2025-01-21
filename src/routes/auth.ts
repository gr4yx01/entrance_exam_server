import { Router } from 'express';
import { loginAsAdministrator, registerAsAdministrator, studentLogin, studentRegistration } from '../controller/auth';

const authRouter = Router()

authRouter.post('/login/admin', loginAsAdministrator)
authRouter.post('/register/admin', registerAsAdministrator)
authRouter.post('/login', studentLogin)
authRouter.post('/register', studentRegistration)

export default authRouter
