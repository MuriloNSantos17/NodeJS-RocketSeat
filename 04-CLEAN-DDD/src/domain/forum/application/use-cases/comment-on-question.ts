import { QuestionCommentRepository } from "../respositories/question-comments-repository";
import { QuestionsRepository } from "../respositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";

interface QuestionUseCaseRequest {
    authorId: string,
    questionId: string,
    content: string
}

type QuestionUseCaseResponse = Either<ResourceNotFoundError, {
    questionComment: QuestionComment
}>

export class CommentOnQuestionUseCase {
    constructor(
        private questionRespository: QuestionsRepository,
        private questionCommentRepository: QuestionCommentRepository
    ) { }

    async execute({ authorId, questionId, content }: QuestionUseCaseRequest): Promise<QuestionUseCaseResponse> {
        const question = await this.questionRespository.findById(questionId);

        if (!question) {
            left(new ResourceNotFoundError())
        }


        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            content: content,
            questionId: new UniqueEntityID(questionId),
        })

        await this.questionCommentRepository.create(questionComment);


        return right({
            questionComment
        })
    }
}