import { Attachment } from '../../enterprise/entities/attachment';

export abstract class AttachmentsRepository {
  abstract create(attchment: Attachment): Promise<void>
}
