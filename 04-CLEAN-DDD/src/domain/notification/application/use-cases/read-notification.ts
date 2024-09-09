import { Notification } from "../../enterprise/entities/notification";
import { Either, left, right } from "@/core/either";
import { NotificationsRepository } from "../repositories/notifications.repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { NotAlowedError } from "@/core/errors/not-alowed-error";

interface ReadNotificationUseCaseRequest {
    recepientId: string,
    notificationId: string
}

type  SendNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAlowedError, {
    notification: Notification
}>

export class ReadNotificationUseCase {
    constructor(
        private notificationRepository: NotificationsRepository
    ) { }

    async execute({ notificationId, recepientId }: ReadNotificationUseCaseRequest): Promise< SendNotificationUseCaseResponse> {

        const notification = await this.notificationRepository.findById(notificationId);

        if (!notification) {
            return left(new ResourceNotFoundError())
        }

        if (recepientId !== notification.recepientId.toString()) {
            return left(new NotAlowedError())
        }

        notification.read();

        await this.notificationRepository.save(notification)

        return right({ notification })
    }
}