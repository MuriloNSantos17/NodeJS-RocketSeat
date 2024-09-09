import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComent } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentRepository {
    create(answerComent: AnswerComent): Promise<void>
    delete(answerComent: AnswerComent): Promise<void>
    findById(id: string): Promise<AnswerComent | null>
    findManyByAnswerId(questionId: string, params: PaginationParams): Promise<AnswerComent[]>
}