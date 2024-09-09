import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { GetQuestionSlugByUseCase } from './get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository
let sut: GetQuestionSlugByUseCase

describe('Get Question by slug', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentRepository);
        sut = new GetQuestionSlugByUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to search a question by slug', async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create('example-question')
        });

        inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            slug: 'example-question'
        })

        expect(result.value).toMatchObject({
            question: expect.objectContaining({
                title: newQuestion.title
            })
        })
        
    })
})

