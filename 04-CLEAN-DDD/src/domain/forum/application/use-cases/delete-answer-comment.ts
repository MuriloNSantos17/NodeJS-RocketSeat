import { AnswerCommentRepository } from "../repositories/answer-comments-repository";
import { left, right, Either } from "@/core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { NotAlowedError } from "../../../../core/errors/not-alowed-error";

interface DeleteCommentOnAnswerUseCaseRequest {
    authorId: string,
    answerCommentId: string,
}

type DeleteCommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {}>

export class DeleteCommentOnAnswerUseCase {
    constructor(
        private answerCommentRepository: AnswerCommentRepository
    ) { }

    async execute({ authorId, answerCommentId, }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
        const answerComment = await this.answerCommentRepository.findById(answerCommentId);

        if (!answerComment) {
            return left(new ResourceNotFoundError())
        }

        if (answerComment.authorId.toString() !== authorId) {
            return left(new NotAlowedError())

        }

        await this.answerCommentRepository.delete(answerComment);

        return right({})
    }
}