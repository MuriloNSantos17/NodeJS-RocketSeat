
import { Answer } from "../../enterprise/entities/answer"
import { UniqueEntityID } from "../../../../core/entites/unique-entity-id";
import { AnswerRespository } from "../respositories/answers-repository";
import { Either, right } from "@/core/either";

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string,
    content: string
}

type AnswerQuestionUseCaseResponse = Either<null, {
    answer: Answer
}>

export class AnswerQuestionUseCase {
    constructor(
        private answerRespository: AnswerRespository
    ) { }

    async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            authorId: new UniqueEntityID(instructorId),
            content,
            questionId: new UniqueEntityID(questionId),

        },)

        await this.answerRespository.create(answer);

        return right({
            answer
        });
    }
}