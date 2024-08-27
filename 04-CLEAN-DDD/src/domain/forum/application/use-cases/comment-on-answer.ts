import { AnswerCommentRepository } from "../respositories/answer-comments-repository";
import { AnswerRespository } from "../respositories/answers-repository";
import { AnswerComent } from "../../enterprise/entities/answer-comment";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Either, left, right, Right } from "@/core/either";

interface AnswerUseCaseRequest {
    authorId: string,
    answerId: string,
    content: string
}

type AnswerUseCaseResponse = Either<ResourceNotFoundError, {
    answerComent: AnswerComent
}>

export class CommentOnAnswerUseCase {
    constructor(
        private answerRespository: AnswerRespository,
        private answerCommentRepository: AnswerCommentRepository
    ) { }

    async execute({ authorId, answerId, content }: AnswerUseCaseRequest): Promise<AnswerUseCaseResponse> {
        const answer = await this.answerRespository.findById(answerId);

        if (!answer) {
            left(new ResourceNotFoundError())
        }


        const answerComent = AnswerComent.create({
            authorId: new UniqueEntityID(authorId),
            content: content,
            answerId: new UniqueEntityID(answerId),
        })

        await this.answerCommentRepository.create(answerComent);


        return right({
            answerComent
        })
    }
}