
import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

import { z } from 'zod';
import { JWTAuthGuard } from "@/infra/auth/jwt.auth.guard";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";


const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JWTAuthGuard)
export class CreateQuestionController {
    constructor(private prisma: PrismaService) {

    }

    @Post()
    async handle(
        @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema,
        @CurrentUser() user: UserPayload
    ) {

        const { content, title } = body;

        const { sub: userId } = user
        const slug = this.convertToSlug(title);

        await this.prisma.question.create({
            data: {
                content,
                title,
                slug,
                authorId: userId
            }
        })
    }

    private convertToSlug(title: string): string {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
    }
}