import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { Document, DocumentType } from '../../domain/models/document.entity';

@Injectable({
    providedIn: 'root'
})
export class DocumentRepositoryImpl extends DocumentRepository {
    upload(file: File, type: DocumentType): Observable<Document> {
        const doc = new Document(Math.random().toString(), type, URL.createObjectURL(file));
        // Simulate API delay
        return of(doc);
    }

    verify(documentId: string): Observable<boolean> {
        return of(true);
    }
}
