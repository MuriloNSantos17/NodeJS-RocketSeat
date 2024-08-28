import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { beforeEach, describe, expect, it, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
    })

    it('should be able to create a answer', async () => {
        const result = await sut.execute({
            content: 'Conteúdo da resposta',
            instructorId: '1',
            questionId: '1',            
        })

        expect(result.isRight()).toBe(true);
        expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    })
})
