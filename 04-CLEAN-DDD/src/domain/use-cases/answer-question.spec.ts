import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRespository } from '../respositories/answers-repository';
import { Answer } from '../entities/answer';


const fakeAnswersRepository: AnswerRespository = {
    create: async (answer: Answer) => {
        return;
    }
}

test('create an answer', async () => {
    const answerQuestion =  new AnswerQuestionUseCase(fakeAnswersRepository);

    const answer = await answerQuestion.execute({
        content: 'Nova Resposta',
        instructorId: '1',
        questionId: '1'
    })

    expect(answer.content).toEqual('Nova Resposta')
})