import { PaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "../../enterprise/entities/answer";

export interface AnswerRespository {
    findById(id: string): Promise<Answer | null>
    findManyByQuestionID(questionID: string, params: PaginationParams): Promise<Answer[]>
    create(answer: Answer): Promise<void>
    save(answer: Answer): Promise<void>
    delete(answer: Answer): Promise<void>
}