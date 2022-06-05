import { Router } from "express"

import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbackRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { SubmitFeedbackUseCase } from "./useCases/submitFeedbackUseCase";


const routes = Router()
routes.post('/feedbacks', async (req, res) => {

  
  const { comment, type, screenshot } = req.body


  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const mailAdapter = new NodemailerAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    mailAdapter
  )
  await submitFeedbackUseCase.execute({ type, comment, screenshot })

  return res.status(201).json({
    message: 'ok'
  })
})

export { routes }