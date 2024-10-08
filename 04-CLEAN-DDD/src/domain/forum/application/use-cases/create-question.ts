import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";

interface QuestionUseCaseRequest {
    authorId: string,
    title: string,
    content: string,
    attchmentsIds: string[]
}

type QuestionUseCaseResponse = Either<null, {
    question: Question
}>

export class CreateQuestionUseCase {
    constructor(
        private questionRepository: QuestionsRepository
    ) { }

    async execute({ authorId, title, content, attchmentsIds }: QuestionUseCaseRequest): Promise<QuestionUseCaseResponse> {

        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content,
        });

        const questionAttachments = attchmentsIds.map((attachmentId) => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                questionId: question.id
            })
        })

        question.attachments = new QuestionAttachmentList(questionAttachments)

        await this.questionRepository.create(question);

        return right({ question })
    }
}