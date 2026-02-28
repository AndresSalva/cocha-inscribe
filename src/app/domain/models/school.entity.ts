export interface School {
    id: string;
    sie: string; // Codigo SIE unico
    name: string;
    description: string;
    imageUrl: string;
    district: string;
    zone: string;
    levels: string[]; // Inicial, Primaria, Secundaria
    vacancies: number;
    address: string;
    coordinates?: { lat: number; lng: number };
    shift: string[]; // Mañana, Tarde, Noche
    schedule: string; // Ej: 08:00 - 12:30
    is_private: boolean;
    type: 'Fiscal' | 'Convenio' | 'Privado';
    price: number;
}
