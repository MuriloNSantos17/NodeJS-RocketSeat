import { AnswerComent, AnswerComentProps } from "@/domain/forum/enterprise/entities/answer-comment";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
    override: Partial<AnswerComentProps> = {},
    id?: UniqueEntityID
) {
    const answerComment = AnswerComent.create({
        answerId: new UniqueEntityID(),
        authorId: new UniqueEntityID('1'),
        content: faker.lorem.text(),
        ...override
    }, id)

    return answerComment;
}