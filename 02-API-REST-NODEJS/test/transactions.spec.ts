import { afterAll, beforeAll, test, describe, it, expect, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import { app } from '../src/app';
import request from 'supertest'

describe('Transactions Routes', () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    test('The user can create a new transaction', async () => {
        await request(app.server).post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            }).
            expect(201)
    });

    it('should be able to show all transactions', async () => {

        const response = await request(app.server).post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })


        const cookies: string[] | undefined = response.get('Set-Cookie');


        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies || [])
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New Transaction',
                amount: 5000
            })
        ])
    });


    it('should be able to get a specific transaction', async () => {

        const response = await request(app.server).post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })


        const cookies: string[] | undefined = response.get('Set-Cookie');


        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies || [])
            .expect(200)

        const transactionId = listTransactionsResponse.body.transactions[0].id;

        const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies || [])
            .expect(200)

        const expectedTransaction = {
            title: 'New Transaction',
            amount: 5000,
        }

        console.log(getTransactionResponse.body.transaction)

        expect(getTransactionResponse.body.transaction).toEqual(
            expect.objectContaining(expectedTransaction),
        )
    });

    it('should be able to get the summary', async () => {

        const response = await request(app.server).post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })


        const cookies: string[] | undefined = response.get('Set-Cookie');

        await request(app.server).post('/transactions')
            .set('Cookie', cookies || [])
            .send({
                title: 'Debit Transaction',
                amount: 2000,
                type: 'debit'
            })


        const summaryResponse = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies || [])
            .expect(200)

        const expectedResponse = {
            sumary: {
                amount: 3000
            }
        }

        expect(summaryResponse.body).toEqual(expectedResponse)
    });
})




