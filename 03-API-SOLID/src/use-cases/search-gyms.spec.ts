import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gysmRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms usecase', () => {

    beforeEach(async () => {
        gysmRepository = new InMemoryGymsRepository();
        sut = new SearchGymUseCase(gysmRepository)
    })

    it('should be able to search for gyms', async () => {
        await gysmRepository.create({
            title: 'JavaScript Gym',
            description: 'Blue Fit',
            latitude: -25.4217854,
            longitude: -49.2740054,
            phone: '995853913',

        })

        await gysmRepository.create({
            title: 'Typescript Gym',
            description: 'Blue Fit',
            latitude: -25.4217854,
            longitude: -49.2740054,
            phone: '995853913',
        })

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1
        });

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gysmRepository.create({
                title: `Typescript-${i}`,
                description: 'Blue Fit',
                latitude: -25.4217854,
                longitude: -49.2740054,
                phone: '995853913',
            })
        }

        const { gyms } = await sut.execute({
            query: 'Typescript',
            page: 2,
        })

        expect(gyms).toHaveLength(2)

        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Typescript-21' }),
            expect.objectContaining({ title: 'Typescript-22' }),
        ])
    });

})