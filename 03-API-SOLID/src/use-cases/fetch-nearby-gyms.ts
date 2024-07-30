
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearByGymsUseCaseRequest {
    userLatitude: number,
    userLongitude: number
}

interface FetchNearByGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearByGymsUseCase {
    constructor(private gysmRepository: GymsRepository) { }

    async execute({ userLatitude, userLongitude }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {
        const gyms = await this.gysmRepository.findManyNearBy({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return { gyms };
    }
}

