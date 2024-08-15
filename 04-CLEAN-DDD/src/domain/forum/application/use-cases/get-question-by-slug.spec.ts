import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { GetQuestionSlugByUseCase } from './get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionSlugByUseCase

describe('Get Question by slug', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new GetQuestionSlugByUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to search a question by slug', async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create('example-question')
        });

        inMemoryQuestionsRepository.create(newQuestion)

        expect(newQuestion.id).toBeTruthy();
        expect(newQuestion.title).toEqual(newQuestion.title);
        expect(inMemoryQuestionsRepository.items[0].id).toEqual(newQuestion.id)
    })
})

