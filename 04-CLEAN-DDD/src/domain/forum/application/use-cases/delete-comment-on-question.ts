import { QuestionCommentRepository } from "../respositories/question-comments-repository";

interface DeleteCommentOnQuestionUseCaseRequest {
    authorId: string,
    questionCommentId: string,
}

interface DeleteCommentOnQuestionUseCaseResponse {
}

export class DeleteCommentOnQuestionUseCase {
    constructor(
        private questionCommentRepository: QuestionCommentRepository
    ) { }

    async execute({ authorId, questionCommentId, }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
        const questionComment = await this.questionCommentRepository.findById(questionCommentId);

        if (!questionComment) {
            throw new Error('Question comment not found')
        }

        if (questionComment.authorId.toString() !== authorId) {
            throw new Error('Question comment not found')
        }

        await this.questionCommentRepository.delete(questionComment);

        return {}
    }
}