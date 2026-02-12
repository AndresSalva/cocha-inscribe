import { Observable } from 'rxjs';
import { UseCase } from '../../core/base/usecase';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.entity';
import { DocumentRepository } from '../repositories/document.repository';
// This assumes student repository handles general enrollment/validation
import { StudentRepository } from '../repositories/student.repository';

// Abstract classes for DI tokens
export abstract class EnrollmentService {
    abstract validateRude(rude: string): Observable<boolean>;
    abstract submitEnrollment(enrollmentData: any): Observable<any>;
}

export abstract class BiometricService {
    abstract verificarRostro(imagen: File): Observable<{ verificado: boolean; score: number }>;
}
