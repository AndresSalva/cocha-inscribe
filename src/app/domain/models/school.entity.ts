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
}
