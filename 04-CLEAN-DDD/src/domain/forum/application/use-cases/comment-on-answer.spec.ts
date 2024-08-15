import { InMemoryAnswerCommentCommentRepository } from 'test/repositories/in-memory-answer-comment-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { beforeEach, describe, expect, it} from 'vitest'
import { makeAnswer } from 'test/factories/make-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentCommentRepository: InMemoryAnswerCommentCommentRepository
let sut: CommentOnAnswerUseCase

describe('Create Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        inMemoryAnswerCommentCommentRepository = new InMemoryAnswerCommentCommentRepository();
        sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentCommentRepository);
    })

    it('should be able to comment o Answer', async () => {
        const answer = makeAnswer();

        await inMemoryAnswersRepository.create(answer);

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: 'Comentário Teste'
        })

        expect(inMemoryAnswerCommentCommentRepository.items[0].content).toEqual('Comentário Teste')
    })
})

