import { Either, left, right } from "@/core/either";
import { AnswerRespository } from "../respositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAlowedError } from "./errors/not-alowed-error";

interface DeleteAnswerUseCaseRequest {
    authorId: string,
    answerId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {}>

export class DeleteAnswerUseCase {
    constructor(
        private answerRespository: AnswerRespository
    ) { }

    async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.answerRespository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAlowedError())
        }

        await this.answerRespository.delete(answer);

        return right({})
    }
}