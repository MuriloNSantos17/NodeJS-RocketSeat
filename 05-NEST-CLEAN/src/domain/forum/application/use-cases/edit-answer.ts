import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository"
import { NotAlowedError } from "../../../../core/errors/not-alowed-error";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { AnswerAttachmentRepository } from "../repositories/answer-attachments-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";

interface EditAnswerUseCaseRequest {
    authorId: string,
    answerId: string,
    content: string,
    attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<NotAlowedError | ResourceNotFoundError, {
    answer: Answer
}>

export class EditAnswerUseCase {
    constructor(
        private AnswersRepository: AnswersRepository,
        private answerAttachmentsRepository: AnswerAttachmentRepository
    ) { }

    async execute({ content, authorId, answerId, attachmentsIds }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        const answer = await this.AnswersRepository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAlowedError())
        }

        const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments)

        const answerAttachments = attachmentsIds.map((attachmentId) => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                answerId: answer.id
            })
        })

        answerAttachmentList.update(answerAttachments)

        answer.attachments = answerAttachmentList;

        answer.content = content;

        await this.AnswersRepository.save(answer);

        return right({
            answer
        })
    }
}