import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../respositories/questions-repository";
import { Either, right } from "@/core/either";

interface QuestionUseCaseRequest {
    authorId: string,
    title: string,
    content: string
}

type QuestionUseCaseResponse = Either<null, {
    question: Question
}>

export class CreateQuestionUseCase {
    constructor(
        private questionRespository: QuestionsRepository
    ) { }

    async execute({ authorId, title, content }: QuestionUseCaseRequest): Promise<QuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content
        });

        await this.questionRespository.create(question);

        return right({ question })
    }
}