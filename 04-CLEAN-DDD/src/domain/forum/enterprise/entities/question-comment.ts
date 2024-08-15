import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "./comment";

export interface QuestionComentProps extends CommentProps {
    questionId: UniqueEntityID
}

export class QuestionComent extends Comment<QuestionComentProps> {

    get answerId() {
        return this.props.questionId;
    }

    static create(props: Optional<QuestionComentProps, 'createdAt'>, id?: UniqueEntityID) {
        const questionComent = new QuestionComent({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)
        return questionComent;
    }
}