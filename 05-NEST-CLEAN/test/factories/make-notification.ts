import { UniqueEntityID } from '@/core/entites/unique-entity-id'
import { Notification, NotificationProps } from '@/domain/notification/enterprise/entities/notification'
import { faker } from '@faker-js/faker'

export function makeNotification(
    override: Partial<NotificationProps> = {},
    id?: UniqueEntityID,
) {
    const notification = Notification.create(
        {
            recepientId: new UniqueEntityID(),
            title: faker.lorem.sentence(4),
            content: faker.lorem.sentence(10),
            ...override,
        },
        id,
    )

    return notification
}