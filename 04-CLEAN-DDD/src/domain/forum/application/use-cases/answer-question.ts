
import { Answer } from "../../enterprise/entities/answer"
import { UniqueEntityID } from "../../../../core/entites/unique-entity-id";
import { AnswerRespository } from "../respositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string,
    content: string
}

interface AnswerQuestionUseCaseResponse {
    answer: Answer
}

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

        return {
            answer
        };
    }
}