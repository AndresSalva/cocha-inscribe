import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of, map } from 'rxjs';
import { SchoolService } from '../../domain/services/school.service';
import { School } from '../../domain/models/school.entity';

@Injectable({
    providedIn: 'root'
})
export class MockSchoolService implements SchoolService {
    // Stub: Simula tu base de datos o API response
    private mockSchools: School[] = [
        {
            id: '1',
            sie: '40680123',
            name: 'U.E. Buenas Nuevas',
            description: 'Unidad educativa con más de 30 años de experiencia formando líderes con valores cristianos y excelencia académica. Instalaciones modernas y laboratorios equipados.',
            imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2574&auto=format&fit=crop',
            district: 'Distrito 4',
            zone: 'Zona Norte',
            levels: ['Primaria', 'Secundaria'],
            vacancies: 25,
            address: 'Av. Circunvalación esq. Los Álamos',
            coordinates: { lat: -17.393835, lng: -66.156946 },
            shift: ['Mañana', 'Tarde'],
            schedule: '08:00 AM - 12:30 PM, 14:00 PM - 18:30 PM',
            is_private: true,
            type: 'Privado',
            price: 550
        },
        {
            id: '2',
            sie: '80920334',
            name: 'Colegio Nacional Sucre',
            description: 'Institución emblemática del departamento, reconocida por su nivel académico y formación técnica humanística. Amplias canchas deportivas.',
            imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop',
            district: 'Distrito 1',
            zone: 'Centro Histórico',
            levels: ['Secundaria'],
            vacancies: 0,
            address: 'Calle Sucre #458',
            coordinates: { lat: -17.399835, lng: -66.159946 },
            shift: ['Mañana'],
            schedule: '08:00 AM - 12:30 PM',
            is_private: false,
            type: 'Fiscal',
            price: 0
        },
        {
            id: '3',
            sie: '20199288',
            name: 'U.E. 27 de Mayo',
            description: 'Educación integral para los más pequeños. Espacios seguros y personal altamente calificado en educación inicial.',
            imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2672&auto=format&fit=crop',
            district: 'Distrito 2',
            zone: 'Zona Sur',
            levels: ['Inicial', 'Primaria'],
            vacancies: 5,
            address: 'Av. Panamericana km 3',
            coordinates: { lat: -17.413835, lng: -66.146946 },
            shift: ['Tarde'],
            schedule: '14:00 PM - 18:30 PM',
            is_private: false,
            type: 'Convenio',
            price: 150
        },
        ...Array.from({ length: 9 }).map((_, i) => ({
            id: (i + 4).toString(),
            sie: `900000${i}`,
            name: `Unidad Educativa Mock ${i + 4}`,
            description: 'Institución de prueba generada automáticamente para verificar el sistema de paginación del catálogo.',
            imageUrl: [
                'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2574&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2672&auto=format&fit=crop'
            ][i % 3],
            district: `Distrito ${i % 4 + 1}`,
            zone: i % 2 === 0 ? 'Zona Norte' : 'Zona Sur',
            levels: ['Primaria', 'Secundaria'],
            vacancies: i * 5,
            address: `Av. Prueba ${i}`,
            coordinates: { lat: -17.3938, lng: -66.1569 },
            shift: ['Mañana'],
            schedule: '08:00 - 12:30',
            is_private: false,
            type: 'Fiscal' as 'Fiscal' | 'Convenio' | 'Privado',
            price: 0
        }))
    ];

    constructor(private http: HttpClient) { }

    getAllSchools(): Observable<School[]> {
        // En un escenario real: return this.http.get<School[]>(`${this.apiUrl}/schools`);
        return of(this.mockSchools).pipe(delay(500));
    }

    getSchoolById(id: string): Observable<School | undefined> {
        // En un escenario real: return this.http.get<School>(`${this.apiUrl}/schools/${id}`);
        const school = this.mockSchools.find(s => s.id === id);
        return of(school).pipe(delay(300));
    }
}
