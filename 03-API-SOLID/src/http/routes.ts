import { authenticate } from "./controllers/authenticate";
import { verifyJWT } from "./middlewares/verify-jwt";
import { register } from "./controllers/register";
import { profile } from "./controllers/profile";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)

    app.post('/sessions', authenticate)

    /** Authenticated */
    app.get('/me', {
        onRequest: [verifyJWT]
    }, profile)
}

