import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { NotAlowedError } from "../../../../core/errors/not-alowed-error";

interface DeleteAnswerUseCaseRequest {
    authorId: string,
    answerId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, null>

export class DeleteAnswerUseCase {
    constructor(
        private AnswersRepository: AnswersRepository
    ) { }

    async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.AnswersRepository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAlowedError())
        }

        await this.AnswersRepository.delete(answer);

        return right(null)
    }
}