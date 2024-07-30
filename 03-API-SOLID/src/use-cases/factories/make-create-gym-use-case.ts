import { PrismaGymRespository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
    const gymsRespository = new PrismaGymRespository();

    const useCase = new CreateGymUseCase(gymsRespository)

    return useCase;
}