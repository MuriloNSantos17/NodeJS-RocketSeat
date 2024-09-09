import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto';
import 'dotenv/config'
import { execSync } from 'node:child_process';

const prisma = new PrismaClient();

const schemaId = randomUUID();

function generateUniqueDatabaseURL(schemaId: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('PLEASE PROVIDE A DATABASE URL ENVIRONMENT VARIABLE')
    }

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schemaId)

    return url.toString();
}

beforeAll(async () => {
    const databaseURL = generateUniqueDatabaseURL(schemaId)
    process.env.DATABASE_URL = databaseURL;
    execSync('npx prisma migrate deploy')
    console.log(databaseURL)
})

afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    await prisma.$disconnect();
})