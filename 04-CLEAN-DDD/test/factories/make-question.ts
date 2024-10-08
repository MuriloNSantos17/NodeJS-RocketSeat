import { UniqueEntityID } from '@/core/entites/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
    Question,
    QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(
    override: Partial<QuestionProps> = {},
    id?: UniqueEntityID,
) {
    const question = Question.create(
        {
            authorId: new UniqueEntityID(),
            title: faker.lorem.sentence(),
            content: faker.lorem.text(),
            ...override,
        },
        id,
    )

    return question
}