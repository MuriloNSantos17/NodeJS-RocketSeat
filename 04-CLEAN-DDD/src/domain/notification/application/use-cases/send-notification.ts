import { Notification } from "../../enterprise/entities/notification";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Either, right } from "@/core/either";
import { NotificationsRepository } from "../repositories/notifications.repository";

interface SendNotificationUseCaseRequest {
    recepientId: string,
    title: string,
    content: string,

}

export type  SendNotificationUseCaseResponse = Either<null, {
    notification: Notification
}>

export class  SendNotificationUseCase {
    constructor(
        private notificationRepository: NotificationsRepository
    ) { }

    async execute({ recepientId, title, content }: SendNotificationUseCaseRequest): Promise< SendNotificationUseCaseResponse> {

        const notification = Notification.create({
            recepientId: new UniqueEntityID(recepientId),
            title,
            content,
        });

        await this.notificationRepository.create(notification)

        return right({ notification })
    }
}