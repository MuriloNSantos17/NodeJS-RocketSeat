import { Entity } from "@/core/entites/entity";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface AnswerProps {
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    content: string
    createdAt: Date
    updateAt?: Date
}

export class Answer extends Entity<AnswerProps> {
    get content() {
        return this.props.content
    }

    get authorId() {
        return this.props.authorId
    }

    get questionId() {
        return this.props.questionId
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

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID) {
        const answer = new Answer({
            ...props,
            createdAt:  props.createdAt ?? new Date()
        }, id)
        return answer;
    }
}