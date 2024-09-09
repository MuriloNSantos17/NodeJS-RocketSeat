import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountControlleer } from "./controllers/create-account.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionController } from "./controllers/fetch-recent-questions.controller";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "../database/database.module";


@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [CreateAccountControlleer, AuthenticateController, CreateQuestionController, FetchRecentQuestionController],
    providers: [PrismaService]
})
export class HttpModule { }