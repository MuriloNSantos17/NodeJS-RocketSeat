import { QuestionsRepository } from "../respositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { Either, right } from "@/core/either";
interface GetQuestionSlugByUseCaseRequest {
    slug: string
}

type GetQuestionSlugByUseCaseResponse = Either<null, {
    question: Question
}>

export class GetQuestionSlugByUseCase {
    constructor(
        private questionRespository: QuestionsRepository
    ) { }

    async execute({ slug }: GetQuestionSlugByUseCaseRequest): Promise<GetQuestionSlugByUseCaseResponse> {
        const question = await this.questionRespository.findBySlug(slug)

        if (!question) {
            throw new Error('Question not found');
        }

        return right({
            question
        })
    }
}