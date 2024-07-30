import { SearchGymUseCase } from "../search-gyms";
import { PrismaGymRespository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
    const gymsRespository = new PrismaGymRespository();

    const useCase = new SearchGymUseCase(gymsRespository)

    return useCase;
}