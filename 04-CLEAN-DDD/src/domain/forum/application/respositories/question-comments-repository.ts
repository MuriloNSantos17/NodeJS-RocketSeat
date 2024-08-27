import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentRepository {
    findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>
    create(questionComment: QuestionComment): Promise<void>
    findById(id: string): Promise<QuestionComment | null>
    delete(questionComment: QuestionComment): Promise<void>
}