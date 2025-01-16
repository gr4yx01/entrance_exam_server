import { Router } from "express";
import { register } from "../controller/registration";

const registrationRouter = Router()

registrationRouter.post('/', register)

