import fastify from 'fastify'
import { knex } from './database';
import { env } from './env';

const app = fastify();

app.get('/hello', async () => {
    const transaction = await knex('transactions').
    where('id', 'f8ee8b05-9203-4348-9b16-57137816faca').
    select('*')

    return transaction
})

app.listen({
    port: env.PORT
}).then(() => {
    console.log('HTTP server is runing 🚀')
});