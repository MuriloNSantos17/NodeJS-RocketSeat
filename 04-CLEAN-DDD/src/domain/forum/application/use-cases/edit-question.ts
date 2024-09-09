import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { NotAlowedError } from "../../../../core/errors/not-alowed-error";
import { QuestionAttachmentRepository } from "../repositories/question-attachments-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";

interface EditQuestionUseCaseRequest {
    authorId: string,
    questionId: string,
    title: string,
    content: string,
    attchmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {
    question: Question
}>

export class EditQuestionUseCase {
    constructor(
        private questionRepository: QuestionsRepository,
        private questionAttachamentRepository: QuestionAttachmentRepository
    ) { }

    async execute({ content, title, authorId, questionId, attchmentsIds }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAlowedError());
        }

        const currentQuestionAttachments = await this.questionAttachamentRepository.findManyByQuestionId(questionId)

        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

        const questionAttachments = attchmentsIds.map((attachmentId) => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                questionId: question.id
            })
        })

        questionAttachmentList.update(questionAttachments)

        question.attachments = questionAttachmentList;
        question.title = title;
        question.content = content;

        await this.questionRepository.save(question);

        return right({
            question
        })
    }
}