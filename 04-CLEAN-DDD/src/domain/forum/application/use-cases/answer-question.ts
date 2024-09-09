
import { Answer } from "../../enterprise/entities/answer"
import { UniqueEntityID } from "../../../../core/entites/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { Either, right } from "@/core/either";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string,
    attchmentsIds: string[],
    content: string
}

type AnswerQuestionUseCaseResponse = Either<null, {
    answer: Answer
}>

export class AnswerQuestionUseCase {
    constructor(
        private AnswersRepository: AnswersRepository
    ) { }

    async execute({ instructorId, questionId, content, attchmentsIds }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            authorId: new UniqueEntityID(instructorId),
            content,
            questionId: new UniqueEntityID(questionId),

        },)

        const answerAttachments = attchmentsIds.map((attachmentId) => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                answerId: answer.id
            })
        })

        answer.attachments = new AnswerAttachmentList(answerAttachments)

        await this.AnswersRepository.create(answer);

        return right({
            answer
        });
    }
}