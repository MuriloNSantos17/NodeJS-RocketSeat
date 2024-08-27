import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../respositories/questions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAlowedError } from "./errors/not-alowed-error";

interface DeleteQuestionUseCaseRequest {
    authorId: string,
    questionId: string
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {}>

export class DeleteQuestionUseCase {
    constructor(
        private questionRespository: QuestionsRepository
    ) { }

    async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionRespository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAlowedError())
        }

        await this.questionRespository.delete(question);

        return right({
        })
    }
}