import { Answer } from "../../enterprise/entities/answer";
import { AnswerRespository } from "../respositories/answers-repository"

interface EditAnswerUseCaseRequest {
    authorId: string,
    answerId: string,
    content: string,
}

interface EditAnswerUseCaseResponse {
    answer: Answer
}

export class EditAnswerUseCase {
    constructor(
        private answerRespository: AnswerRespository
    ) { }

    async execute({ content, authorId, answerId }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        const answer = await this.answerRespository.findById(answerId);

        if (!answer) {
            throw new Error('Answer not Found')
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error('User not allowed to edit this answer')
        }


        answer.content = content;

        await this.answerRespository.save(answer);

        return {
            answer
        }
    }
}