import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRespository } from '../respositories/answers-repository'

interface FetchAnswersUseCaseRequest {
    questionID: string,
    page: number
}

type FetchAnswersUseCaseResponse = Either<null, {
    answers: Answer[]
}>

export class FetchAnswersUseCase {
    constructor(private answerRepository: AnswerRespository) { }

    async execute({
        page,
        questionID,
    }: FetchAnswersUseCaseRequest): Promise<FetchAnswersUseCaseResponse> {
        const answers = await this.answerRepository.findManyByQuestionID(questionID, { page })

        return right({
            answers,
        })
    }
}