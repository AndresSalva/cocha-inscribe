import { BaseEntity } from './base.entity';

export enum RegistrationStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    REJECTED = 'REJECTED'
}

export class Student extends BaseEntity {
    rude: string;
    ci: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    status: RegistrationStatus;

    constructor(id: string, rude: string, ci: string) {
        super(id);
        this.rude = rude;
        this.ci = ci;
        this.status = RegistrationStatus.PENDING;
    }

    updateInfo(firstName: string, lastName: string, email: string): void {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.updatedAt = new Date();
    }

    completeRegistration(): void {
        this.status = RegistrationStatus.COMPLETED;
        this.updatedAt = new Date();
    }
}
