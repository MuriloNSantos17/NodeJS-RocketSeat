import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchAnswersUseCaseRequest {
    questionID: string,
    page: number
}

type FetchAnswersUseCaseResponse = Either<null, {
    answers: Answer[]
}>

export class FetchAnswersUseCase {
    constructor(private AnswersRepository: AnswersRepository) { }

    async execute({
        page,
        questionID,
    }: FetchAnswersUseCaseRequest): Promise<FetchAnswersUseCaseResponse> {
        const answers = await this.AnswersRepository.findManyByQuestionID(questionID, { page })

        return right({
            answers,
        })
    }
}