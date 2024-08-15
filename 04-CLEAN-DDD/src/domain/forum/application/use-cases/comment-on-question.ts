import { QuestionCommentRepository } from "../respositories/question-comments-repository";
import { QuestionsRepository } from "../respositories/questions-repository";
import { QuestionComent } from "../../enterprise/entities/question-comment";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";

interface QuestionUseCaseRequest {
    authorId: string,
    questionId: string,
    content: string
}

interface QuestionUseCaseResponse {
    questionComent: QuestionComent
}

export class CommentOnQuestionUseCase {
    constructor(
        private questionRespository: QuestionsRepository,
        private questionCommentRepository: QuestionCommentRepository
    ) { }

    async execute({ authorId, questionId, content }: QuestionUseCaseRequest): Promise<QuestionUseCaseResponse> {
        const question = await this.questionRespository.findById(questionId);

        if (!question) {
            throw new Error('Question not found')
        }


        const questionComent = QuestionComent.create({
            authorId: new UniqueEntityID(authorId),
            content: content,
            questionId: new UniqueEntityID(questionId),
        })

        await this.questionCommentRepository.create(questionComent);


        return {
            questionComent
        }
    }
}