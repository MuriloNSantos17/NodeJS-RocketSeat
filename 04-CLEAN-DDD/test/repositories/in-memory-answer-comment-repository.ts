import { AnswerCommentRepository } from "@/domain/forum/application/respositories/answer-comments-repository"
import { AnswerComent } from "@/domain/forum/enterprise/entities/answer-comment"

export class InMemoryAnswerCommentCommentRepository implements AnswerCommentRepository {
    public items: AnswerComent[] = []

    async create(answerComment: AnswerComent) {
        this.items.push(answerComment)
    }

}