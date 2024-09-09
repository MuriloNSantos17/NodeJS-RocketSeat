import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComent } from "@/domain/forum/enterprise/entities/answer-comment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAnswerCommentsRepository implements AnswerCommentRepository {
    create(answerComent: AnswerComent): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(answerComent: AnswerComent): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<AnswerComent | null> {
        throw new Error("Method not implemented.");
    }
    findManyByAnswerId(questionId: string, params: PaginationParams): Promise<AnswerComent[]> {
        throw new Error("Method not implemented.");
    }

}