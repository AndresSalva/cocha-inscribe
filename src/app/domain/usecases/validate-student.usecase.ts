import { Observable } from 'rxjs';
import { UseCase } from '../../core/base/usecase';
import { Student } from '../models/student.entity';
import { StudentRepository } from '../repositories/student.repository';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidateStudentUseCase implements UseCase<{ rude: string; ci: string }, Student | null> {
    constructor(private studentRepository: StudentRepository) { }

    execute(params: { rude: string; ci: string }): Observable<Student | null> {
        return this.studentRepository.findByRude(params.rude);
    }
}
