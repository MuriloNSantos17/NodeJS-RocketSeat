import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ConflictException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { hash } from "bcryptjs";
import { z } from 'zod';
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";


const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountControlleer {
    constructor(private prisma: PrismaService) {

    }

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {
        const { name, email, password } = (body);

        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (userWithSameEmail) {
            throw new ConflictException('User with same e-maill address already exist')
        }

        const hashedPassword = await hash(password, 8);

        await this.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })
    }
}