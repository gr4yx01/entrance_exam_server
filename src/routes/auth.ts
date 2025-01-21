import { Router } from 'express';
import { getProfile, loginAsAdministrator, registerAsAdministrator, studentLogin, studentRegistration } from '../controller/auth';
import { verifyToken } from '../middleware/auth';

const authRouter = Router()

authRouter.post('/login/admin', loginAsAdministrator)
authRouter.post('/register/admin', registerAsAdministrator)
authRouter.post('/login', studentLogin)
authRouter.post('/register', studentRegistration)
authRouter.get('/me', verifyToken, getProfile)
 
export default authRouter
