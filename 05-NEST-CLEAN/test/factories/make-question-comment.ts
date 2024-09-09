import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
    override: Partial<QuestionCommentProps> = {},
    id?: UniqueEntityID
) {
    const questionComment = QuestionComment.create({
        questionId: new UniqueEntityID(),
        authorId: new UniqueEntityID('1'),
        content: faker.lorem.text(),
        ...override
    }, id)

    return questionComment;
}