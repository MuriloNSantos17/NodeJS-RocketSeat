import { Module } from '@nestjs/common'

import { AuthenticateController } from './controllers/authenticate.controller'

import { CreateQuestionController } from './controllers/create-question.controller'

import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { CreateAccountControlleer } from './controllers/create-account.controller'
import { FetchRecentQuestionController } from './controllers/fetch-recent-questions.controller'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'

@Module({
    imports: [DatabaseModule],
    controllers: [
        CreateAccountControlleer,
        AuthenticateController,
        CreateQuestionController,
        FetchRecentQuestionController,
    ],
    providers: [CreateQuestionUseCase,
        FetchRecentQuestionsUseCase
    ],
})
export class HttpModule { }