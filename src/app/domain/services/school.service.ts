import { Observable } from 'rxjs';
import { School } from '../models/school.entity';

// Contrato abstracto para el servicio de colegios (Interface Segregation / Dependency Inversion)
export abstract class SchoolService {
    // Obtener lista completa (para catalogo)
    abstract getAllSchools(): Observable<School[]>;

    // Obtener detalle por ID (para vista individual)
    abstract getSchoolById(id: string): Observable<School | undefined>;
}
