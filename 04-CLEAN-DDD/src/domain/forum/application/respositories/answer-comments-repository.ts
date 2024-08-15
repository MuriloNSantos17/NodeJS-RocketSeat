import { AnswerComent } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentRepository {
    create(answerComent: AnswerComent): Promise<void>
}