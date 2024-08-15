import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerRespository } from "@/domain/forum/application/respositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRespository {
    public items: Answer[] = []

    async create(answer: Answer) {
        this.items.push(answer)
    }


    async findById(answerID: string) {
        const answer = this.items.find(item => item.id.toString() === answerID);

        if (!answer) {
            return null
        }

        return answer;
    }

    async delete(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id == answer.id)

        this.items.splice(itemIndex, 1)
    }

    async save(answer: Answer) {
        const itemIndex = this.items.findIndex(item => item.id == answer.id)
        this.items[itemIndex] = answer;
    }

    async findManyByQuestionID(questionID: string, { page }: PaginationParams,) {
        const answers = this.items.filter(item => item.questionId.toString() === questionID)
            .slice((page - 1) * 20, page * 20);

        return answers;
    }

}