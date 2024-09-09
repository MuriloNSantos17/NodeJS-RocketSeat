import { Entity } from "@/core/entites/entity";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";

export interface AnswerAttachmentProps {
    answerId: UniqueEntityID,
    attachmentId: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
    get answerId() {
        return this.props.answerId;
    }

    get attachmentId() {
        return this.props.attachmentId;
    }

    static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
        const answerAttachment = new AnswerAttachment(props, id)
        return answerAttachment;
    }
}