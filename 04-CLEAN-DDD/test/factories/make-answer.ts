import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { faker } from '@faker-js/faker'

export function makeAnswer(
    override: Partial<AnswerProps> = {},
    id?: UniqueEntityID
) {
    const newAnswer = Answer.create({
        questionId: new UniqueEntityID(),
        authorId: new UniqueEntityID('1'),
        content: faker.lorem.text(),
        ...override
    }, id)

    return newAnswer;
}