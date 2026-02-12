import { Observable } from 'rxjs';
import { UseCase } from '../../core/base/usecase';
import { Document, DocumentType } from '../models/document.entity';
import { DocumentRepository } from '../repositories/document.repository';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UploadDocumentUseCase implements UseCase<{ file: File; type: DocumentType }, Document> {
    constructor(private documentRepository: DocumentRepository) { }

    execute(params: { file: File; type: DocumentType }): Observable<Document> {
        return this.documentRepository.upload(params.file, params.type);
    }
}
