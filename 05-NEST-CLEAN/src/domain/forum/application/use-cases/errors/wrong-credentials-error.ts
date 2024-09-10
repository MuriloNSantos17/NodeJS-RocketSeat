import { UseCaseError } from "@/core/errors/user-case-error";

export class WrongCredentialsError extends Error implements UseCaseError {
    constructor() {
        super(`Credentials are not valid`)
    }
}