import { QuestionsRepository } from "../respositories/questions-repository";

interface DeleteQuestionUseCaseRequest {
    authorId: string,
    questionId: string
}

interface DeleteQuestionUseCaseResponse {
}

export class DeleteQuestionUseCase {
    constructor(
        private questionRespository: QuestionsRepository
    ) { }

    async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionRespository.findById(questionId);

        if (!question) {
            throw new Error('Question not Found')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('User not allowed to delete this question')
        }

        await this.questionRespository.delete(question);

        return {
        }
    }
}