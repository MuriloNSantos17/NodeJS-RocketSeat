import { checkInRoutes } from "./http/controllers/check-ins/routes";
import { userRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod";
import fastify from "fastify";
import { env } from "./env";
export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign:{
        expiresIn: '10m'
    }
})

app.register(fastifyCookie);
app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400)
            .send({
                message: 'Validation error.',
                issues: error.format()
            })
    }

    if (env.NODE_ENV !== 'production') {
        console.log(error)
    }

    return reply.status(500).send({ message: 'Internal server error' })
})


