import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';
import { EnrollmentService, BiometricService } from '../../domain/services/enrollment.service';

@Injectable({
    providedIn: 'root'
})
export class MockEnrollmentService implements EnrollmentService {
    private apiUrl = 'https://api.educacion.gob.bo/api/v1'; // Endpoint ficticio

    constructor(private http: HttpClient) { }

    // STUB: Validar RUDE
    validateRude(rude: string): Observable<boolean> {
        console.log(`[STUB] Checks RUDE: ${rude}`);
        // Simulamos que el RUDE "INVALID" falla, todos los demás pasan
        if (rude === 'INVALID') return of(false).pipe(delay(500));
        return of(true).pipe(delay(800));

        // IMPLEMENTACIÓN REAL SERÍA:
        // return this.http.get<boolean>(`${this.apiUrl}/students/validate/${rude}`);
    }

    // STUB: Enviar inscripción
    submitEnrollment(data: any): Observable<any> {
        console.log('[STUB] Submitting enrollment:', data);
        return of({ success: true, trackingId: '2026-XDF99' }).pipe(delay(1500));

        // IMPLEMENTACIÓN REAL SERÍA:
        // return this.http.post(`${this.apiUrl}/enrollments`, data);
    }
}

@Injectable({
    providedIn: 'root'
})
export class MockBiometricService implements BiometricService {

    constructor(private http: HttpClient) { }

    // STUB: Verificar rostro
    verificarRostro(imagen: File): Observable<{ verificado: boolean; score: number }> {
        console.log('[STUB] Verifying face biometrics...');
        return of({ verificado: true, score: 0.98 }).pipe(delay(2000));

        // IMPLEMENTACIÓN REAL SERÍA:
        // const formData = new FormData();
        // formData.append('image', imagen);
        // return this.http.post<any>('https://biometrics.api/verify', formData);
    }
}
