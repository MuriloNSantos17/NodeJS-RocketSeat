import { StudentAlreadyExistsError } from "./errors/student-already-exists-error";
import { StudentsRepository } from "../repositories/students-repository";
import { HashGenerator } from "../criptography/hash-generator";
import { Student } from "../../enterprise/entities/student";
import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { HashComparer } from "../criptography/hash-comparer";
import { Encrypter } from "../criptography/ecrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateStudentUseCaseRequest {
    email: string,
    password: string,
}

type AuthenticateStudentUseCaseResponse = Either<WrongCredentialsError, {
    accessToken: string
}>

@Injectable()
export class AuthenticateStudentUseCase {
    constructor(
        private studentRepository: StudentsRepository,
        private hashComparer: HashComparer,
        private encrypter: Encrypter
    ) { }

    async execute({ email, password }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {

        const student = await this.studentRepository.findByEmail(email)

        if (!student) {
            return left(new WrongCredentialsError())
        }

        const isPasswordValid = await this.hashComparer.compare(password, student.password)

        if (!isPasswordValid) {
            return left(new WrongCredentialsError())
        }

        const accessToken = await this.encrypter.ecrypt({ sub: student.id.toString() })

        return right({
            accessToken: accessToken
        })
    }
}