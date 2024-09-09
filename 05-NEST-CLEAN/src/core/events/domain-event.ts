import { UniqueEntityID } from "../entites/unique-entity-id"

export interface DomainEvent {
    ocurredAt: Date
    getAggregateId(): UniqueEntityID
}
