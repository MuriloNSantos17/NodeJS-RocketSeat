import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentRepository } from "@/domain/forum/application/respositories/answer-comments-repository"
import { AnswerComent } from "@/domain/forum/enterprise/entities/answer-comment"

export class InMemoryAnswerCommentCommentRepository implements AnswerCommentRepository {
    public items: AnswerComent[] = []

    async findById(commentId: string) {
        const answerComment = this.items.find(item => item.id.toString() === commentId);

        if (!answerComment) {
            return null
        }

        return answerComment;
    }

    async create(answerComment: AnswerComent) {
        this.items.push(answerComment)
    }

    async delete(answerComment: AnswerComent) {
        const itemIndex = this.items.findIndex((item) => {
            item.id === answerComment.id
        })

        this.items.splice(itemIndex, 1)
    }

    async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
        const answerComments = this.items
            .filter((item) => item.answerId.toString() === answerId)
            .slice((page - 1) * 20, page * 20)

        return answerComments
    }
}