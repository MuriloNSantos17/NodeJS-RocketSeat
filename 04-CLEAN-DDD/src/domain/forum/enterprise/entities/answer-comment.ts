import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "./comment";

export interface AnswerComentProps extends CommentProps {
    answerId: UniqueEntityID
}

export class AnswerComent extends Comment<AnswerComentProps> {

    get answerId() {
        return this.props.answerId;
    }

    static create(props: Optional<AnswerComentProps, 'createdAt'>, id?: UniqueEntityID) {
        const answerComent = new AnswerComent({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)
        return answerComent;
    }
}