import { AnswerCommentRepository } from '../repositories/answer-comments-repository'
import { AnswerComent } from '../../enterprise/entities/answer-comment'
import { Either, right } from '@/core/either'

interface FetchAnswerCommentsRequest {
    answerID: string,
    page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<null, {
    answerComments: AnswerComent[]
}>

export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentRepository: AnswerCommentRepository) { }

    async execute({
        page,
        answerID,
    }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
        const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerID, { page })

        return right({ answerComments });
    }
}