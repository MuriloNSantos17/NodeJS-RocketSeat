import { AnswerRespository } from "../respositories/answers-repository";
import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string,
    content: string
}

export class AnswerQuestionUseCase {
    constructor(
        private answerRespository: AnswerRespository
    ) { }

    async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
        const answer = new Answer({
            authorId: instructorId,
            content,
            questionId
        },)

        await this.answerRespository.create(answer);
        
        return answer;
    }
}