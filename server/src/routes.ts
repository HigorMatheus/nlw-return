import { Router } from "express"
import nodemailer from 'nodemailer'
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbackRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { SubmitFeedbackUseCase } from "./useCases/submitFeedbackUseCase";
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4529def58c0a5c",
    pass: "699bd7a1263b19"
  }
});

export const routes = Router()
routes.post('/feedbacks', async (req, res) => {
  const { comment, type, screenshot } = req.body
  const prismaFeedbackRepository= new PrismaFeedbackRepository()
  const mailAdapter = new NodemailerAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    mailAdapter
  )
  await submitFeedbackUseCase.execute({ type, comment, screenshot })

  res.status(201).send()
})

