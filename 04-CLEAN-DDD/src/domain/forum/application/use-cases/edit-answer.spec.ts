import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { beforeEach, describe, expect, it } from 'vitest'
import { EditAnswerUseCase } from './edit-answer';
import { NotAlowedError } from './errors/not-alowed-error';


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new EditAnswerUseCase(inMemoryAnswersRepository);
    })

    it('should be able to edit a answer by id', async () => {
        const newAnswer = makeAnswer({
            content: 'teste resposta',
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));

        inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            content: 'teste resposta',
            answerId: newAnswer.id.toString(),
            authorId: 'author-1'
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'teste resposta',
        })
    })

    it('should not be able to edit a answer if a diferent authorId', async () => {
        const newAnswer = makeAnswer({
            content: 'teste resposta',
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));

        inMemoryAnswersRepository.create(newAnswer)

        const result = await sut.execute({
            content: 'teste resposta',
            answerId: 'answer-1',
            authorId: 'author-2'
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAlowedError);
    })
})

