import { DomainEvent } from "@/core/events/domain-event";
import { Answer } from "../entities/answer";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Question } from "../entities/question";

export class QuestionBestAnswerChosenEvent implements DomainEvent {
    public ocurredAt: Date;
    public question: Question
    public bestAnswerId: UniqueEntityID

    constructor(question: Question, bestAnswerId: UniqueEntityID) {
        this.question = question;
        this.bestAnswerId = bestAnswerId;
        this.ocurredAt = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.question.id
    }
}