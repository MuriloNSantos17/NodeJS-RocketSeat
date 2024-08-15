import { InMemoryQuestionCommentCommentRepository } from 'test/repositories/in-memory-question-comment-repository';
import { beforeEach, describe, expect, it, test } from 'vitest'
import { DeleteCommentOnQuestionUseCase } from './delete-comment-on-question';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';

let inMemoryQuestionCommentCommentRepository: InMemoryQuestionCommentCommentRepository
let sut: DeleteCommentOnQuestionUseCase

describe('Delete Question Comment', () => {

    beforeEach(() => {
        inMemoryQuestionCommentCommentRepository = new InMemoryQuestionCommentCommentRepository();
        sut = new DeleteCommentOnQuestionUseCase(inMemoryQuestionCommentCommentRepository);
    })

    it('should be able to delete a question comment', async () => {
        const questionComment = makeQuestionComment();

        await inMemoryQuestionCommentCommentRepository.create(questionComment);

        await sut.execute({
            questionCommentId: questionComment.id.toString(),
            authorId: questionComment.authorId.toString()
        })

        expect(inMemoryQuestionCommentCommentRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a question comment', async () => {
        const questionComment = makeQuestionComment({
            authorId: new UniqueEntityID('author-1')
        });

        await inMemoryQuestionCommentCommentRepository.create(questionComment);

        expect(() => {
            return sut.execute({
                questionCommentId: questionComment.id.toString(),
                authorId: new UniqueEntityID('author-2').toString()
            })
        }).rejects.toBeInstanceOf(Error)


    })
})

