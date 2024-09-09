import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notification-repository';
import { ReadNotificationUseCase } from './read-notification';
import { makeNotification } from 'test/factories/make-notification';
import { NotAlowedError } from '@/core/errors/not-alowed-error';
import { UniqueEntityID } from '@/core/entites/unique-entity-id';

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Send Notification', () => {

    beforeEach(() => {
        inMemoryNotificationRepository = new InMemoryNotificationsRepository();
        sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
    })

    it('should be able to send a Notification', async () => {
        const notification = makeNotification();

        inMemoryNotificationRepository.create(notification);

        const result = await sut.execute({
            notificationId: notification.id.toString(),
            recepientId: notification.recepientId.toString()
        })

        expect(result.isRight()).toBe(true);
        expect(inMemoryNotificationRepository.items[0].readAt).toEqual(expect.any(Date))
    })

    it('should not be able to read a answer from another user', async () => {
        const notification = makeNotification({
            recepientId: new UniqueEntityID('recepient-1')
        });

        inMemoryNotificationRepository.create(notification)

        const result = await sut.execute({
            recepientId: 'recepient-2',
            notificationId: notification.id.toString()
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAlowedError);

    })
})

