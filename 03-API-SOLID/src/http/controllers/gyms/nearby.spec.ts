import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { app } from '@/app';
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it('should be able to list nearby gym', async () => {
        const { token } = await createAndAuthenticateUser(app, true);

        await request(app.server)
            .post("/gyms")
            .set('Authorization', `Bearer ${token}`).send({
                title: 'JavaScript Gym',
                description: 'Some Description',
                phone: null,
                latitude: -27.2092052,
                longitude: -49.6401091,
            });

        await request(app.server)
            .post("/gyms")
            .set('Authorization', `Bearer ${token}`).send({
                title: 'TypeScript Gym',
                description: 'Some Description',
                phone: null,
                latitude: -27.0610928,
                longitude: -49.5229501,
            });

        const response = await request(app.server)
            .get('/gyms/nearby')
            .set('Authorization', `Bearer ${token}`).query({
                latitude: -27.2092052,
                longitude: -49.6401091,
            }).send()

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym',
            })
        ])
    })
})