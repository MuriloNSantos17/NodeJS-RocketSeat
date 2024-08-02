import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckinsParamsSchema = z.object({
        checkInId: z.string().uuid()
    })

    const { checkInId } = validateCheckinsParamsSchema.parse(request.params);

    const validateCheckInUseCase = makeValidateCheckInUseCase();

    await validateCheckInUseCase.execute({
        checkInId: checkInId
    })

    return reply.status(204).send();
}