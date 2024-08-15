import { UniqueEntityID } from "@/core/entites/unique-entity-id";
import { Entity } from "@/core/entites/entity";

interface StudentProps {
    name: string
}
export class Student extends Entity<StudentProps> {
    static create(props: StudentProps, id: UniqueEntityID) {
        const student = new Student({
            ...props,
        }, id)
        return student;
    }
}