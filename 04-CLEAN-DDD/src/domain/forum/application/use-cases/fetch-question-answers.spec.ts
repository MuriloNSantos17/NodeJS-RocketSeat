import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchAnswersUseCase } from './fetch-question-asnwer'
import { makeQuestion } from 'test/factories/make-question'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entites/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: FetchAnswersUseCase

describe('Fetch Question Answers', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        sut = new FetchAnswersUseCase(inMemoryAnswersRepository)
    })

    it('should be able to fetch recent answer questions', async () => {
        await inMemoryAnswersRepository.create(
            makeAnswer({ createdAt: new Date(), questionId: new UniqueEntityID('question-1') })
        )
        await inMemoryAnswersRepository.create(
            makeAnswer({ createdAt: new Date(), questionId: new UniqueEntityID('question-1') })
        )

        await inMemoryAnswersRepository.create(
            makeAnswer({ createdAt: new Date(), questionId: new UniqueEntityID('question-1') })
        )

        const result = await sut.execute({
            page: 1,
            questionID: 'question-1'
        })

        expect(result.value?.answers).toHaveLength(3)
    })

    it('should be able to fetch question answers', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswersRepository.create(
                makeAnswer({ createdAt: new Date(), questionId: new UniqueEntityID('question-1') })
            )
        }

        const result = await sut.execute({
            page: 2,
            questionID: 'question-1'
        })

        expect(result.value?.answers).toHaveLength(2)
    })
})