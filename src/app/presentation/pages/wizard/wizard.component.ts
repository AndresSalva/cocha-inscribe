import { Component, WritableSignal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityStepComponent } from './steps/identity-step/identity-step.component';
import { DocumentStepComponent } from './steps/document-step/document-step.component';
import { DocumentsStepComponent } from './steps/documents-step/documents-step.component';
import { BiometricStepComponent } from './steps/biometric-step/biometric-step.component';
import { SuccessStepComponent } from './steps/success-step/success-step.component';

@Component({
    selector: 'app-wizard',
    standalone: true,
    imports: [
        CommonModule,
        IdentityStepComponent,
        DocumentStepComponent,
        DocumentsStepComponent,
        BiometricStepComponent,
        SuccessStepComponent
    ],
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.css']
})
export class WizardComponent {
    currentStep: WritableSignal<number> = signal(1);
    steps = [1, 2, 3, 4, 5, 6];
    stepLabels = ['Identidad', 'C.I. Anverso', 'C.I. Reverso', 'Documentos', 'Biometría', 'Finalizado'];

    progress = computed(() => (this.currentStep() - 1) * 20);

    nextStep() {
        if (this.currentStep() < 6) {
            this.currentStep.update(s => s + 1);
        }
    }

    prevStep() {
        if (this.currentStep() > 1) {
            this.currentStep.update(s => s - 1);
        }
    }

    goToStep(step: number) {
        // Just for debug/demo, usually guarded logic here
        this.currentStep.set(step);
    }
}
