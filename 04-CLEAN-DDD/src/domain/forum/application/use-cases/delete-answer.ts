import { AnswerRespository } from "../respositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
    authorId: string,
    answerId: string
}

interface DeleteAnswerUseCaseResponse {
}

export class DeleteAnswerUseCase {
    constructor(
        private answerRespository: AnswerRespository
    ) { }

    async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.answerRespository.findById(answerId);

        if (!answer) {
            throw new Error('Answer not Found')
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error('User not allowed to delete this answer')
        }

        await this.answerRespository.delete(answer);

        return {
        }
    }
}