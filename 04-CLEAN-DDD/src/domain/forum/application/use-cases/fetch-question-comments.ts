import { QuestionCommentRepository } from '../respositories/question-comments-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { Either, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchQuestionCommentsRequest {
    questionID: string,
    page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<null, {
    questionComments: QuestionComment[]
}>

export class FetchQuestionCommentsUseCase {
    constructor(private questionCommentRepository: QuestionCommentRepository) { }

    async execute({
        page,
        questionID,
    }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
        const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionID, { page })

        return right({ questionComments });
    }
}