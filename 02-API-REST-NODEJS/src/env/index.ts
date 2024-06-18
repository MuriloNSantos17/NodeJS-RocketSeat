import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
})

export const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.log(`⚠️ Invalid enviroment variables`, _env.error.format())
}

export const env = _env.data