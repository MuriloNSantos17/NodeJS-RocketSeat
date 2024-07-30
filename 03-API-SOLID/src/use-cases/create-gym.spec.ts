import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register use Case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymRepository)
    })

    it('should be able to register', async () => {
        const { gym } = await sut.execute({
            description: 'Blue Fit',
            latitude: -25.4217854,
            longitude: -49.2740054,
            phone: '995853913',
            title: "Blue Fit"
        })

        expect(gym.id).toEqual(expect.any(String))
    });

})