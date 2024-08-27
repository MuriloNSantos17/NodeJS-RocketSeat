import { QuestionsRepository } from "../respositories/questions-repository";
import { AnswerRespository } from "../respositories/answers-repository";
import { Question } from "../../enterprise/entities/question";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAlowedError } from "./errors/not-alowed-error";

interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId: string,
    answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {
    question: Question
}>

export class ChooseQuestionBestAnswerUseCase {
    constructor(
        private questionsRespository: QuestionsRepository,
        private answerRespository: AnswerRespository
    ) { }

    async execute({ answerId, authorId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

        const answer = await this.answerRespository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        const question = await this.questionsRespository.findById(
            answer.questionId.toValue()
        );

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAlowedError())
        }

        question.bestAnswerId = answer.id;

        await this.questionsRespository.save(question);

        return right({
            question
        })
    }
}