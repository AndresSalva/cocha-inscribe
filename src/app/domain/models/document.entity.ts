import { BaseEntity } from './base.entity';

export enum DocumentType {
    BIRTH_CERTIFICATE = 'Certificado de Nacimiento',
    SCHOOL_RECORD = 'Libreta Escolar',
    PARENT_ID = 'CI Padre/Tutor',
    STUDENT_ID_FRONT = 'CI Estudiante Anverso',
    STUDENT_ID_BACK = 'CI Estudiante Reverso'
}

export class Document extends BaseEntity {
    type: DocumentType;
    fileUrl: string;
    isVerified: boolean;

    constructor(id: string, type: DocumentType, fileUrl: string) {
        super(id);
        this.type = type;
        this.fileUrl = fileUrl;
        this.isVerified = false;
    }

    verify(): void {
        this.isVerified = true;
        this.updatedAt = new Date();
    }
}
