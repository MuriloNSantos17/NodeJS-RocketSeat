import { Entity } from "@/core/entites/entity";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";

interface QuestionAttachmentProps {
    questionId: UniqueEntityID,
    attachmentId: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
    get questionId() {
        return this.props.questionId;
    }

    get attachmentId() {
        return this.props.attachmentId;
    }

    static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
        const questionAttachment = new QuestionAttachment(props, id)
        return questionAttachment;
    }
}