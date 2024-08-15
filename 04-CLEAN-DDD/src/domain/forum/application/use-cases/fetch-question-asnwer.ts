import { Answer } from '../../enterprise/entities/answer'
import { AnswerRespository } from '../respositories/answers-repository'
import { QuestionsRepository } from '../respositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface FetchAnswersUseCaseRequest {
    questionID: string,
    page: number
}

interface FetchAnswersUseCaseResponse {
    answers: Answer[]
}

export class FetchAnswersUseCase {
    constructor(private answerRepository: AnswerRespository) { }

    async execute({
        page,
        questionID,
    }: FetchAnswersUseCaseRequest): Promise<FetchAnswersUseCaseResponse> {
        const answers = await this.answerRepository.findManyByQuestionID(questionID, { page })

        return {
            answers,
        }
    }
}