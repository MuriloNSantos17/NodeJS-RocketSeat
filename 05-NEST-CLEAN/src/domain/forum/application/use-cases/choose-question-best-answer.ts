import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { NotAlowedError } from "../../../../core/errors/not-alowed-error";
import { AnswersRepository } from "../repositories/answers-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId: string,
    answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {
    question: Question
}>

export class ChooseQuestionBestAnswerUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private AnswersRepository: AnswersRepository
    ) { }

    async execute({ answerId, authorId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

        const answer = await this.AnswersRepository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        const question = await this.questionsRepository.findById(
            answer.questionId.toValue()
        );

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAlowedError())
        }

        question.bestAnswerId = answer.id;

        await this.questionsRepository.save(question);

        return right({
            question
        })
    }
}