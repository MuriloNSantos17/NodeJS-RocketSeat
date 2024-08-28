import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { NotAlowedError } from './errors/not-alowed-error';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository);
    })

    it('should be able to choose the question best answer', async () => {
        const question = makeQuestion();

        const answer = makeAnswer({
            questionId: question.id
        });

        await inMemoryQuestionsRepository.create(question);
        await inMemoryAnswersRepository.create(answer);

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString()
        })

        expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)

    })

    it('should not be able to choose question best answer if a diferent user id', async () => {
        const question = makeQuestion(
            {
                authorId: new UniqueEntityID('author-1')
            }
        );

        const answer = makeAnswer({
            questionId: question.id,
        });

        await inMemoryQuestionsRepository.create(question);
        await inMemoryAnswersRepository.create(answer);


        const result = await sut.execute({
            answerId: answer.id.toString(),
            authorId: 'author 2'
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAlowedError);

    })


})
