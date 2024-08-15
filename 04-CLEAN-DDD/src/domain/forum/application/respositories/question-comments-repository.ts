import { QuestionComent } from "../../enterprise/entities/question-comment";

export interface QuestionCommentRepository {
    create(questionComent: QuestionComent): Promise<void>
    findById(id: string): Promise<QuestionComent | null>
    delete(questionComent: QuestionComent): Promise<void>
}