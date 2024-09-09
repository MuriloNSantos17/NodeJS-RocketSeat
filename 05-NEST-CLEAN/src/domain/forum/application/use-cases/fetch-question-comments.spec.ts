import { beforeEach, describe, expect, it } from 'vitest'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entites/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comment-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question QuestionComments', () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
    })

    it('should be able to fetch question comments', async () => {
        await inMemoryQuestionCommentsRepository.create(
            makeQuestionComment({ createdAt: new Date(), questionId: new UniqueEntityID('question-1') })
        )

        await inMemoryQuestionCommentsRepository.create(
            makeQuestionComment({ createdAt: new Date(), questionId: new UniqueEntityID('question-1') })
        )

        await inMemoryQuestionCommentsRepository.create(
            makeQuestionComment({ createdAt: new Date(), questionId: new UniqueEntityID('question-1') })
        )

        const result = await sut.execute({
            page: 1,
            questionID: 'question-1'
        })

        expect(result.value?.questionComments).toHaveLength(3)
    })

    it('should be able to fetch question questioncomments', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryQuestionCommentsRepository.create(
                makeQuestionComment({ createdAt: new Date(), questionId: new UniqueEntityID('question-1') })
            )
        }

        const result = await sut.execute({
            questionID: 'question-1',
            page: 2,
        })

        expect(result.value?.questionComments).toHaveLength(2)
    })
})