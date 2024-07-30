
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest {
    title: string,
    description: string | null
    phone: string | null
    latitude: number,
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gysmRepository: GymsRepository) { }

    async execute({ title, phone, description, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const gym = await this.gysmRepository.create({
            title: title,
            description: description,
            latitude: latitude,
            longitude: longitude,
            phone: phone ?? null
        })

        return { gym };
    }
}

