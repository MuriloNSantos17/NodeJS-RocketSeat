import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { SendNotificationUseCaseResponse, SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notification-repository";
import { makeQuestion } from "test/factories/make-question";
import { waitFor } from "test/utils/wait-for";
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer.chosen";


let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachments: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository

let inMemorySendNotificationRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
    (
        request: SendNotificationUseCase,
    ) => Promise<SendNotificationUseCaseResponse>
>

describe('On Question Best Answer Chosen', () => {
    beforeEach(() => {
        inMemorySendNotificationRepository = new InMemoryNotificationsRepository();
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
        inMemoryAnswerAttachments = new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachments);
        sendNotificationUseCase = new SendNotificationUseCase(inMemorySendNotificationRepository);

        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

        new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sendNotificationUseCase)
    })

    it('should send a notification when topic has new best answer chosen', async () => {
        const question = makeQuestion();

        const answer = makeAnswer({
            questionId: question.id
        });

        inMemoryQuestionRepository.create(question);
        inMemoryAnswersRepository.create(answer);

        question.bestAnswerId = answer.id;

        inMemoryQuestionRepository.save(question)

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled();
        })
    })
})