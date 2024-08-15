import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../respositories/questions-repository";

interface GetQuestionSlugByUseCaseRequest {
    slug: string
}

interface GetQuestionSlugByUseCaseResponse {
    question: Question
}

export class GetQuestionSlugByUseCase {
    constructor(
        private questionRespository: QuestionsRepository
    ) { }

    async execute({ slug }: GetQuestionSlugByUseCaseRequest): Promise<GetQuestionSlugByUseCaseResponse> {
        const question = await this.questionRespository.findBySlug(slug)

        if (!question) {
            throw new Error('Question not found');
        }

        return {
            question
        }
    }
}