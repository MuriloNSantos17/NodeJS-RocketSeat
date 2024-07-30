import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { PrismaGymRespository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../checkin";

export function makeCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const gymsRespository = new PrismaGymRespository();

    const useCase = new CheckInUseCase(checkInsRepository, gymsRespository)

    return useCase;
}