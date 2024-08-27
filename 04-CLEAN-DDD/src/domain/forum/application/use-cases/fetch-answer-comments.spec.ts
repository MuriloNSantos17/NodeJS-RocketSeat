import { beforeEach, describe, expect, it } from 'vitest'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entites/unique-entity-id'
import { InMemoryAnswerCommentCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer AnswerComments', () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentCommentRepository()
        sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
    })

    it('should be able to fetch answer comments', async () => {
        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({ createdAt: new Date(), answerId: new UniqueEntityID('answer-1') })
        )

        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({ createdAt: new Date(), answerId: new UniqueEntityID('answer-1') })
        )

        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({ createdAt: new Date(), answerId: new UniqueEntityID('answer-1') })
        )

        const result = await sut.execute({
            page: 1,
            answerID: 'answer-1'
        })

        expect(result.value?.answerComments).toHaveLength(3)
    })

    it('should be able to fetch answer answercomments', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswerCommentsRepository.create(
                makeAnswerComment({ createdAt: new Date(), answerId: new UniqueEntityID('answer-1') })
            )
        }

        const result = await sut.execute({
            page: 2,
            answerID: 'answer-1'
        })

        expect(result.value?.answerComments).toHaveLength(2)
    })
})