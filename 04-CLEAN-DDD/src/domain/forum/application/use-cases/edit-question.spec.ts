import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { beforeEach, describe, expect, it } from 'vitest'
import { EditQuestionUseCase } from './edit-question';
import { NotAlowedError } from './errors/not-alowed-error';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to edit a question by id', async () => {
        const newQuestion = makeQuestion({
            content: 'teste pergunta',
            title: 'Pergunta 01',
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            content: 'teste pergunta2',
            title: 'Pergunta 02',
            questionId: newQuestion.id.toString(),
            authorId: 'author-1'
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            content: 'teste pergunta2',
            title: 'Pergunta 02',
        })
    })

    it('should not be able to edit a question if a diferent authorId', async () => {
        const newQuestion = makeQuestion({
            content: 'teste pergunta',
            title: 'Pergunta 01',
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            content: 'teste',
            title: 'teste',
            questionId: 'question-1',
            authorId: 'author-2'
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAlowedError);

    
    })
})

