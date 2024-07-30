import { FetchNearByGymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymRespository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsUseCase() {
    const gymsRespository = new PrismaGymRespository();

    const useCase = new FetchNearByGymsUseCase(gymsRespository)

    return useCase;
}