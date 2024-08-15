import { QuestionsRepository } from "../respositories/questions-repository";
import { AnswerRespository } from "../respositories/answers-repository";
import { Question } from "../../enterprise/entities/question";

interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId: string,
    answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
    question: Question
}

export class ChooseQuestionBestAnswerUseCase {
    constructor(
        private questionsRespository: QuestionsRepository,
        private answerRespository: AnswerRespository
    ) { }

    async execute({ answerId, authorId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

        const answer = await this.answerRespository.findById(answerId);

        if (!answer) {
            throw new Error('Answer not found')
        }

        const question = await this.questionsRespository.findById(
            answer.questionId.toValue()
        );

        if (!question) {
            throw new Error('Question not found')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not alowed')
        }

        question.bestAnswerId = answer.id;

        await this.questionsRespository.save(question);

        return {
            question
        }
    }
}