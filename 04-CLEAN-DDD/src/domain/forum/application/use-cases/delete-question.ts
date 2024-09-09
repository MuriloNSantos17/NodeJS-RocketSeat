import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { NotAlowedError } from "../../../../core/errors/not-alowed-error";

interface DeleteQuestionUseCaseRequest {
    authorId: string,
    questionId: string
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {}>

export class DeleteQuestionUseCase {
    constructor(
        private questionRepository: QuestionsRepository
    ) { }

    async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAlowedError())
        }

        await this.questionRepository.delete(question);

        return right({
        })
    }
}