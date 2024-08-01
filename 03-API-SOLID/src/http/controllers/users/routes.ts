import { authenticate } from "./authenticate";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { register } from "./register";
import { profile } from "./profile";
import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', register)

    app.post('/sessions', authenticate)

    /** Authenticated */
    app.get('/me', {
        onRequest: [verifyJWT]
    }, profile)
}

