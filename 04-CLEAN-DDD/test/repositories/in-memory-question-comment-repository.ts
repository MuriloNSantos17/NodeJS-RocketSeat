import { QuestionCommentRepository } from "@/domain/forum/application/respositories/question-comments-repository"
import { QuestionComent } from "@/domain/forum/enterprise/entities/question-comment"

export class InMemoryQuestionCommentCommentRepository implements QuestionCommentRepository {
    public items: QuestionComent[] = []

    async create(questionComment: QuestionComent) {
        this.items.push(questionComment)
    }

    async findById(commentId: string) {
        const questionComment = this.items.find(item => item.id.toString() === commentId);

        if (!questionComment) {
            return null
        }

        return questionComment;
    }

    async delete(questionComent: QuestionComent) {
        const itemIndex = this.items.findIndex((item) => {
            item.id === questionComent.id
        })

        this.items.splice(itemIndex, 1)
    }

}