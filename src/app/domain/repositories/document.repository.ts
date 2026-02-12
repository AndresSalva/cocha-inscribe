import { Observable } from 'rxjs';
import { Document, DocumentType } from '../models/document.entity';

export abstract class DocumentRepository {
    abstract upload(file: File, type: DocumentType): Observable<Document>;
    abstract verify(documentId: string): Observable<boolean>;
}
