import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Register use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)
        vi.useFakeTimers()

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Javascript gym',
            description: 'Javascript',
            latitude: -27.2092052,
            longitude: -49.6401091,
            phone: '1112'
        })

    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        console.log(checkIn.created_at)

        expect(checkIn.id).toEqual(expect.any(String))
    });

    it('should not be able to check twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(async () => {
            await sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -27.2092052,
                userLongitude: -49.6401091
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to check twice but in diferent day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Javascript gym',
            description: 'Javascript',
            latitude: new Decimal(-25.4217854),
            longitude: new Decimal(-49.2740054),
            phone: '1112'
        })

        expect(async () => {
            await sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -27.2092052,
                userLongitude: -49.6401091
            })
        }).rejects.toBeInstanceOf(Error)
    });
})