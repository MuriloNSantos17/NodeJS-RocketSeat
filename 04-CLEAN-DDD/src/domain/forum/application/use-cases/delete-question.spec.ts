import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteQuestionUseCase } from './delete-question';
import { NotAlowedError } from '../../../../core/errors/not-alowed-error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAtachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {

    beforeEach(() => {
        inMemoryQuestionsAtachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionsAtachmentsRepository);
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to delete a question by id', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        inMemoryQuestionsRepository.create(newQuestion)

        inMemoryQuestionsAtachmentsRepository.items.push(
            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityID('1')
            }),
            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityID('2')
            })
        )

        await sut.execute({
            questionId: 'question-1',
            authorId: 'author-1'
        })

        expect(inMemoryQuestionsRepository.items).toHaveLength(0)
        expect(inMemoryQuestionsAtachmentsRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a question by id', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            questionId: 'question-1',
            authorId: 'author-2'
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAlowedError);

    })
})

