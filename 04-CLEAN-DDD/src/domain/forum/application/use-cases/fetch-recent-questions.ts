import { Either, right } from '@/core/either'
import { QuestionsRepository } from '../respositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface FetchRecentQuestionsUseCaseRequest {
    page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<null, {
    questions: Question[]
}>

export class FetchRecentQuestionsUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }

    async execute({
        page,
    }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecents({ page })

        return right({
            questions,
        })
    }
}