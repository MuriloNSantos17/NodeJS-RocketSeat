import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications.repository"
import { Notification } from "@/domain/notification/enterprise/entities/notification"


export class InMemoryNotificationsRepository implements NotificationsRepository {
    public items: Notification[] = []

    async create(notification: Notification) {
        this.items.push(notification)
    }

    async save(notification: Notification): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id == notification.id)
        this.items[itemIndex] = notification;
    }

    async findById(notificationId: string) {
        const notification = this.items.find(item => item.id.toString() === notificationId);

        if (!notification) {
            return null
        }

        return notification;
    }

}