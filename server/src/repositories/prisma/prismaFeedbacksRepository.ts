import { FeedbackCreateProps, FeedbacksRepository } from "../feedbacksRepository";
import { prisma } from "../../prisma";

export class PrismaFeedbackRepository implements FeedbacksRepository {

 async create({comment,type,screenshot}:FeedbackCreateProps ){
    await prisma.feedback.create({
      data: {
        comment,
        type,
        screenshot
      }
    })
  }

}