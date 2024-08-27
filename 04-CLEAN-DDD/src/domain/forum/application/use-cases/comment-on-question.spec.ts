
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { beforeEach, describe, expect, it, test } from 'vitest'
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comment-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentCommentRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Create Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        inMemoryQuestionCommentCommentRepository = new InMemoryQuestionCommentsRepository();
        sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentCommentRepository);
    })

    it('should be able to comment o Question', async () => {
        const question = makeQuestion();

        await inMemoryQuestionsRepository.create(question);

        await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: 'Comentário Teste'
        })

        expect(inMemoryQuestionCommentCommentRepository.items[0].content).toEqual('Comentário Teste')
    })
})

