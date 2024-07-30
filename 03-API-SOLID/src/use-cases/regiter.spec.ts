import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'

import { compare } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'john doe',
            email: 'john@doe.com.br',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    });

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'john doe',
            email: 'john@doe.com.br',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true)
    });

    it('should not be able to register with same email twice', async () => {
        const email = 'johndoe@example.com'

        await sut.execute({
            name: 'john doe',
            email: email,
            password: '123456'
        })

        expect(async () => {
            await sut.execute({
                name: 'john doe',
                email: email,
                password: '123456'
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})