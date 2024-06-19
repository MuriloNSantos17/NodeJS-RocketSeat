import { transactionsRoutes } from './routes/transactions';
import cookie from '@fastify/cookie'
import { knex } from './database';
import fastify from 'fastify'
import { env } from './env';

const app = fastify();

app.register(cookie);

app.register(transactionsRoutes, {
    prefix: 'transactions'
});

app.listen({
    port: env?.PORT
}).then(() => {
    console.log('HTTP server is runing 🚀')
});