import { Either, left, right } from "@/core/either";
import { QuestionCommentRepository } from "../respositories/question-comments-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAlowedError } from "./errors/not-alowed-error";

interface DeleteCommentOnQuestionUseCaseRequest {
    authorId: string,
    questionCommentId: string,
}

type DeleteCommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {}>

export class DeleteCommentOnQuestionUseCase {
    constructor(
        private questionCommentRepository: QuestionCommentRepository
    ) { }

    async execute({ authorId, questionCommentId, }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
        const questionComment = await this.questionCommentRepository.findById(questionCommentId);

        if (!questionComment) {
            return left(new ResourceNotFoundError())
        }

        if (questionComment.authorId.toString() !== authorId) {
            return left(new NotAlowedError())
        }

        await this.questionCommentRepository.delete(questionComment);

        return right({})
    }
}