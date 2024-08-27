import { InMemoryAnswerCommentCommentRepository } from 'test/repositories/in-memory-answer-comment-repository';
import { beforeEach, describe, expect, it, test } from 'vitest'
import { DeleteCommentOnAnswerUseCase } from './delete-answer-comment';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';
import { NotAlowedError } from './errors/not-alowed-error';

let inMemoryAnswerCommentCommentRepository: InMemoryAnswerCommentCommentRepository
let sut: DeleteCommentOnAnswerUseCase

describe('Delete Answer Comment', () => {

    beforeEach(() => {
        inMemoryAnswerCommentCommentRepository = new InMemoryAnswerCommentCommentRepository();
        sut = new DeleteCommentOnAnswerUseCase(inMemoryAnswerCommentCommentRepository);
    })

    it('should be able to delete a answer comment', async () => {
        const answerComment = makeAnswerComment();

        await inMemoryAnswerCommentCommentRepository.create(answerComment);

        await sut.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: answerComment.authorId.toString()
        })

        expect(inMemoryAnswerCommentCommentRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a answer comment', async () => {
        const answerComment = makeAnswerComment({
            authorId: new UniqueEntityID('author-1')
        });

        await inMemoryAnswerCommentCommentRepository.create(answerComment);

        const result = await sut.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: new UniqueEntityID('author-2').toString()
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAlowedError)


    })
})

