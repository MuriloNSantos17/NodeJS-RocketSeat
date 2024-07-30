import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'

let gysmRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('Fetch Nearby Gyms usecase', () => {

    beforeEach(async () => {
        gysmRepository = new InMemoryGymsRepository();
        sut = new FetchNearByGymsUseCase(gysmRepository)
    })

    it('should be able to fetch nearby gyms', async () => {
        await gysmRepository.create({
            title: 'Near Gym',
            description: 'Blue Fit',
            latitude: -27.2092052,
            longitude: -49.6401091,
            phone: '995853913',

        })

        await gysmRepository.create({
            title: 'Far Gym',
            description: 'Blue Fit',
            latitude: -27.0610928,
            longitude: -49.5229501,
            phone: '995853913',
        })

        const { gyms } = await sut.execute({
           userLatitude: -27.2092052,
           userLongitude: -49.6401091
        });

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
    })
})