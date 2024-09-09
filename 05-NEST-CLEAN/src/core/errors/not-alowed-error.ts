import { UseCaseError } from "@/core/errors/user-case-error";

export class NotAlowedError extends Error implements UseCaseError {
    constructor() {
        super('Not Allowed')
    }
}