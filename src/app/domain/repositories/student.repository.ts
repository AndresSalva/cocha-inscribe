import { Observable } from 'rxjs';
import { Student } from '../models/student.entity';

export abstract class StudentRepository {
    abstract findByRude(rude: string): Observable<Student | null>;
    abstract save(student: Student): Observable<Student>;
    abstract update(student: Student): Observable<Student>;
}
