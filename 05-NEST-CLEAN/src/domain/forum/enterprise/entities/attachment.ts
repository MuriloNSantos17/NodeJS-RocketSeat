import { Entity } from "@/core/entites/entity";
import { UniqueEntityID } from "@/core/entites/unique-entity-id";

interface AttachmentProps {
    title: string,
    link: string,
    
}

export class Attachment extends Entity<AttachmentProps> {
    getTitle() {
        return this.props.title;
    }

    getList() {
        return this.props.link;
    }

    static create(props: AttachmentProps, id?: UniqueEntityID) {
        const attachment = new Attachment(props, id)
        return attachment;
    }
}