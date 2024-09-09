import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notification-repository';
import { SendNotificationUseCase } from './send-notification';

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {

    beforeEach(() => {
        inMemoryNotificationRepository = new InMemoryNotificationsRepository();
        sut = new SendNotificationUseCase(inMemoryNotificationRepository);
    })

    it('should be able to send a Notification', async () => {
        const result = await sut.execute({
            content: 'Conteúdo da notificação',
            recepientId: '1',
            title: "Notificação 1",
        })

        expect(result.isRight()).toBe(true);
        expect(inMemoryNotificationRepository.items[0]).toEqual(result.value?.notification)
    })
})

