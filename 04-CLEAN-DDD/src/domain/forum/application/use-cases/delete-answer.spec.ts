import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteAnswerUseCase } from './delete-answer';


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
    })

    it('should be able to delete a answer by id', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));

        inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            answerId: 'answer-1',
            authorId: 'author-1'
        })

        expect(inMemoryAnswersRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a answer by id', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));

        inMemoryAnswersRepository.create(newAnswer)

        expect(async () => {
            await sut.execute({
                answerId: 'answer-1',
                authorId: 'author-2'
            })
        }).rejects.toBeInstanceOf(Error);

    })
})

