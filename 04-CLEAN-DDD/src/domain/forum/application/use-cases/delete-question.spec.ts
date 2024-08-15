import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteQuestionUseCase } from './delete-question';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to delete a question by id', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            questionId: 'question-1',
            authorId: 'author-1'
        })

        expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a question by id', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        inMemoryQuestionsRepository.create(newQuestion)

        expect(async () => {
            await sut.execute({
                questionId: 'question-1',
                authorId: 'author-2'
            })
        }).rejects.toBeInstanceOf(Error);

    })
})

