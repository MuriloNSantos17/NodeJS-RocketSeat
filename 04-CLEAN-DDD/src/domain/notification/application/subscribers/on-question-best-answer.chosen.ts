import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";

import { QuestionBestAnswerChosenEvent } from "@/domain/forum/enterprise/events/question-best-answer-chosen";

import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";

export class OnQuestionBestAnswerChosen implements EventHandler {
    constructor(
        private answersRepository: AnswersRepository,
        private sendNotification: SendNotificationUseCase,
    ) {
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.sendBestAnswerNotification.bind(this), QuestionBestAnswerChosenEvent.name)
    }

    private async sendBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent) {
        const answer = await this.answersRepository.findById(
            bestAnswerId.toString()
        )

        if (answer) {
            await this.sendNotification.execute({
                recepientId: answer.authorId.toString(),
                title: `Sua resposta foi escolhida!` ,
                content: `A resposta que você enviou em "${question.title.substring(0,20)}" foi escolhida pelo autor!`
            });
        }

        // console.log(answer)
    }
}