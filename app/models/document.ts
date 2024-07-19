export class Document {
  id!: string;
  type!: string;
  value!: string;
  createdAt!: string;
  updatedAt!: string;
  isBlocked!: boolean;
}

export class DocumentUpdate {
  id!: string;
  value!: string;
  isBlocked!: boolean;
}

export class DocumentPayload {
  type!: string;
  value!: string;
  isBlocked!: boolean;
}