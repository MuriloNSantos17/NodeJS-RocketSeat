import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { beforeEach, describe, expect, it } from 'vitest'
import { EditQuestionUseCase } from './edit-question';
import { NotAlowedError } from '../../../../core/errors/not-alowed-error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository);
    })

    it('should be able to edit a question by id', async () => {
        const newQuestion = makeQuestion({
            content: 'teste pergunta',
            title: 'Pergunta 01',
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        inMemoryQuestionsRepository.create(newQuestion)

        inMemoryQuestionAttachmentsRepository.items.push(
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
            content: 'teste pergunta2',
            title: 'Pergunta 02',
            questionId: newQuestion.id.toString(),
            authorId: 'author-1',
            attchmentsIds: ['1', '3']
        })


        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            content: 'teste pergunta2',
            title: 'Pergunta 02',
        })

        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
        ])
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
            authorId: 'author-2',
            attchmentsIds: []
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAlowedError);


    })
})

