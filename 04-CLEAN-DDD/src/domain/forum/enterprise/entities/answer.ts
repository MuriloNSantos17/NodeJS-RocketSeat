import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { AnswerAttachmentList } from "./answer-attachment-list";
import { AggregateRoot } from "@/core/entites/aggregate-root";
import { AnswerCreatedEvent } from "../events/answer-created-event";

export interface AnswerProps {
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    attachments: AnswerAttachmentList
    content: string
    createdAt: Date
    updateAt?: Date
}

export class Answer extends AggregateRoot<AnswerProps> {
    get content() {
        return this.props.content
    }

    get authorId() {
        return this.props.authorId
    }

    get questionId() {
        return this.props.questionId
    }

    get attachments() {
        return this.props.attachments
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updateAt() {
        return this.props.updateAt
    }

    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('...')
    }

    private touch() {
        this.props.updateAt = new Date();
    }

    set attachments(attachments: AnswerAttachmentList) {
        this.props.attachments = attachments;
        this.touch();
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    static create(props: Optional<AnswerProps, 'createdAt' | 'attachments'>, id?: UniqueEntityID) {
        const answer = new Answer({
            ...props,
            attachments: props.attachments ?? new AnswerAttachmentList,
            createdAt: props.createdAt ?? new Date()
        }, id)

        const isNewAnswer = !id;

        if (isNewAnswer) {
            answer.addDomainEvent(new AnswerCreatedEvent(answer))
        }

        return answer;
    }
}