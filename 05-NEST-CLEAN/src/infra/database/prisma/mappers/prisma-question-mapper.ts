import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Question as PrismaQuestion, Prisma } from "@prisma/client";

export class PrismaQuestionMapper {
    static toDomain(raw: PrismaQuestion): Question {
        return Question.create({
            authorId: new UniqueEntityID(raw.authorId),
            content: raw.content,
            title: raw.title,
            bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.bestAnswerId) : null,
            slug: Slug.create(raw.slug),
            createdAt: raw.createdAt,
            updateAt: raw.updatedAt,
        }, new UniqueEntityID(raw.id))
    }

    static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
        return {
            id: question.id.toString(),
            authorId: question.authorId.toString(),
            bestAnswerId: question.bestAnswerId?.toString(),
            title: question.title,
            content: question.content,
            slug: question.slug.value,
            createdAt: question.createdAt,
            updatedAt: question.updateAt
        }
    }
}