import { beforeEach, describe, expect, it, test } from 'vitest'

import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to create a Question', async () => {
        const result = await sut.execute({
            content: 'Conteúdo pergunta',
            authorId: '1',
            title: "Pergunta 1",
            attchmentsIds: ['1', '2']
        })

        expect(result.isRight()).toBe(true);
        expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
        expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2)
        expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
            expect.objectContaining({attachmentId: new UniqueEntityID('1')}),
            expect.objectContaining({attachmentId: new UniqueEntityID('2')})            
        ])
})
})
