import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../respositories/questions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAlowedError } from "./errors/not-alowed-error";

interface EditQuestionUseCaseRequest {
    authorId: string,
    questionId: string,
    title: string,
    content: string,
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {
    question: Question
}>

export class EditQuestionUseCase {
    constructor(
        private questionRespository: QuestionsRepository
    ) { }

    async execute({ content, title, authorId, questionId }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionRespository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAlowedError());
        }

        question.title = title;
        question.content = content;

        await this.questionRespository.save(question);

        return right({
            question
        })
    }
}