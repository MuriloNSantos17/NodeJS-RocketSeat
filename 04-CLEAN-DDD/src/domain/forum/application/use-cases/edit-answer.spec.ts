import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { beforeEach, describe, expect, it } from 'vitest'
import { EditAnswerUseCase } from './edit-answer';
import { NotAlowedError } from '../../../../core/errors/not-alowed-error';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment';


let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
        sut = new EditAnswerUseCase(inMemoryAnswersRepository,inMemoryAnswerAttachmentsRepository);
    })

    it('should be able to edit a answer by id', async () => {
        const newAnswer = makeAnswer({
            content: 'teste resposta',
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));

        inMemoryAnswersRepository.create(newAnswer)

        inMemoryAnswerAttachmentsRepository.items.push(
            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityID('1')
            }),
            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityID('2')
            })
        )

        await sut.execute({
            content: 'teste resposta',
            answerId: newAnswer.id.toString(),
            authorId: 'author-1',
            attachmentsIds: ['1','3']
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'teste resposta',
        })

        expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
        ])
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
            authorId: 'author-2',
            attachmentsIds: []
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAlowedError);
    })
})

