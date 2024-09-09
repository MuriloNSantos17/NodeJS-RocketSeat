import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { Injectable } from "@nestjs/common";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

@Injectable()
export class PrismaQuestionCommentsRepository implements QuestionCommentRepository {
    findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]> {
        throw new Error("Method not implemented.");
    }
    create(questionComment: QuestionComment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<QuestionComment | null> {
        throw new Error("Method not implemented.");
    }
    delete(questionComment: QuestionComment): Promise<void> {
        throw new Error("Method not implemented.");
    }
}