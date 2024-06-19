import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
import { randomUUID } from 'node:crypto';
import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from 'zod';

export async function transactionsRoutes(app: FastifyInstance) {
    // app.addHook('preHandler', async (request, reply) => {
    //     console.log(`${request.url} ${request.url}`)
    // });


    app.get('/',
        {
            preHandler: [checkSessionIdExists]
        }, async (request) => {

            const { sessionId } = request.cookies;

            const transactions = await knex('transactions').
                where('session_id', sessionId).
                select();

            return {
                transactions
            };
        });

    app.get('/:id', {
        preHandler: [checkSessionIdExists]
    }, async (req) => {
        const getTransactParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const params = getTransactParamsSchema.parse(req.params);

        const { id } = params;

        const { sessionId } = req.cookies;

        const transaction = await knex('transactions')
            .where({ id: id, session_id: sessionId })
            .first();

        return transaction
    })

    app.get('/summary', {
        preHandler: [checkSessionIdExists]
    }, async (req) => {
        const { sessionId } = req.cookies;

        const sumary = await knex('transactions')
            .where('session_id', sessionId)
            .sum('amount', {
                as: 'amount',
                maxAge: 60 * 60 * 24 * 7 //7 days
            })
            .first();
        return {
            sumary
        };
    })

    app.post('/', async (req, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { amount, title, type } = createTransactionBodySchema.parse(req.body);

        let sessionId = req.cookies.sessionId;


        if (!sessionId) {
            sessionId = randomUUID();

            reply.cookie('sessionId', sessionId, {
                path: "/",
            })
        }

        await knex('transactions').insert({
            id: randomUUID(),
            title: title,
            amount: type == 'credit' ? amount : amount * -1,
            session_id: sessionId
        })

        return reply.status(201).send();
    })
}