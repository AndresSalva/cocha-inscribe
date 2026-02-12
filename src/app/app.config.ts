import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { StudentRepository } from './domain/repositories/student.repository';
import { StudentRepositoryImpl } from './data/repositories/student.repository.impl';
import { DocumentRepository } from './domain/repositories/document.repository';
import { DocumentRepositoryImpl } from './data/repositories/document.repository.impl';
import { EnrollmentService, BiometricService } from './domain/services/enrollment.service';
import { MockEnrollmentService, MockBiometricService } from './data/services/mock-services';
import { SchoolService } from './domain/services/school.service';
import { MockSchoolService } from './data/services/mock-school.service';


export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(), // Habilita el cliente HTTP real

        // Inyección de Dependencias (DI)
        // Aquí definimos que cuando un componente pida un Repositorio o Servicio abstracto,
        // le daremos la implementación concreta (actualmente Mocks/Stubs)
        { provide: StudentRepository, useClass: StudentRepositoryImpl },
        { provide: DocumentRepository, useClass: DocumentRepositoryImpl },
        { provide: EnrollmentService, useClass: MockEnrollmentService },
        { provide: BiometricService, useClass: MockBiometricService },
        { provide: SchoolService, useClass: MockSchoolService }
    ]
};
