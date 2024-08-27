import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRespository } from "../respositories/answers-repository"
import { NotAlowedError } from "./errors/not-alowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditAnswerUseCaseRequest {
    authorId: string,
    answerId: string,
    content: string,
}

type EditAnswerUseCaseResponse = Either<NotAlowedError | ResourceNotFoundError, {
    answer: Answer
}>

export class EditAnswerUseCase {
    constructor(
        private answerRespository: AnswerRespository
    ) { }

    async execute({ content, authorId, answerId }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        const answer = await this.answerRespository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAlowedError())
        }


        answer.content = content;

        await this.answerRespository.save(answer);

        return right({
            answer
        })
    }
}