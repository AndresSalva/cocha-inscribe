import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StudentRepository } from '../../domain/repositories/student.repository';
import { Student, RegistrationStatus } from '../../domain/models/student.entity';

@Injectable({
    providedIn: 'root'
})
export class StudentRepositoryImpl extends StudentRepository {
    // Mock database
    private students: Student[] = [
        new Student('1', '8062000', '1234567 LP')
    ];

    findByRude(rude: string): Observable<Student | null> {
        const student = this.students.find(s => s.rude === rude) || null;
        // Simulate API delay
        return of(student);
    }

    save(student: Student): Observable<Student> {
        this.students.push(student);
        return of(student);
    }

    update(student: Student): Observable<Student> {
        const index = this.students.findIndex(s => s.id === student.id);
        if (index !== -1) {
            this.students[index] = student;
        }
        return of(student);
    }
}
