import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../respositories/questions-repository";

interface EditQuestionUseCaseRequest {
    authorId: string,
    questionId: string,
    title: string,
    content: string,
}

interface EditQuestionUseCaseResponse {
    question: Question
}

export class EditQuestionUseCase {
    constructor(
        private questionRespository: QuestionsRepository
    ) { }

    async execute({ content, title, authorId, questionId }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionRespository.findById(questionId);

        if (!question) {
            throw new Error('Question not Found')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('User not allowed to edit this question')
        }

        question.title = title;
        question.content = content;

        await this.questionRespository.save(question);

        return {
            question
        }
    }
}