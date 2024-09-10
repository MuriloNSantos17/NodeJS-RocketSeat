
import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

import { z } from 'zod';
import { JWTAuthGuard } from "@/infra/auth/jwt.auth.guard";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";


const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JWTAuthGuard)
export class CreateQuestionController {
    constructor(private createQuestion: CreateQuestionUseCase) {

    }

    @Post()
    async handle(
        @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema,
        @CurrentUser() user: UserPayload
    ) {

        const { content, title } = body;

        const { sub: userId } = user
      
        await this.createQuestion.execute({
            title: title,
            content: content,
            authorId: userId,
            attchmentsIds: []
        })
    }

}