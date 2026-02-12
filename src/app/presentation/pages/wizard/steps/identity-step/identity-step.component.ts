import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateStudentUseCase } from '../../../../../domain/usecases/validate-student.usecase';

@Component({
    selector: 'app-identity-step',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="animate-in space-y-10">
      <div class="text-center max-w-lg mx-auto space-y-3">
        <h2 class="text-3xl font-black text-institutional tracking-tight uppercase">Paso 1: Identidad</h2>
        <p class="text-gray-500 font-medium italic">Inicie la validación con los datos del sistema nacional.</p>
      </div>

      <form [formGroup]="identityForm" (ngSubmit)="onSubmit()" class="space-y-8 max-w-2xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 ml-1">Código RUDE</label>
            <input formControlName="rude" type="text" placeholder="8062000..." 
                   class="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-lg text-institutional transition-all placeholder:text-gray-300"
                   [class.border-red-300]="isFieldInvalid('rude')" />
            <div *ngIf="isFieldInvalid('rude')" class="text-red-500 text-xs font-bold pl-2">Requerido</div>
          </div>
          
          <div class="space-y-3">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 ml-1">C.I. Estudiante</label>
            <input formControlName="ci" type="text" placeholder="1234567 LP" 
                   class="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-lg text-institutional transition-all placeholder:text-gray-300"
                   [class.border-red-300]="isFieldInvalid('ci')" />
             <div *ngIf="isFieldInvalid('ci')" class="text-red-500 text-xs font-bold pl-2">Requerido</div>
          </div>
        </div>

        <div class="flex justify-center pt-8">
          <button type="submit" [disabled]="identityForm.invalid || isLoading"
                  class="px-12 py-5 bg-institutional text-white rounded-2xl font-black flex items-center gap-3 hover:bg-emerald-800 shadow-xl shadow-emerald-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1">
            <span *ngIf="isLoading" class="material-icons animate-spin">refresh</span>
            <span *ngUnless="isLoading">VALIDAR IDENTIDAD</span>
            <span class="material-icons" *ngIf="!isLoading">arrow_forward</span>
          </button>
        </div>
        
        <p *ngIf="error" class="text-center text-red-500 font-bold text-sm bg-red-50 p-4 rounded-xl border border-red-100">{{ error }}</p>
      </form>
    </div>
  `
})
export class IdentityStepComponent {
    private fb = inject(FormBuilder);
    private validateStudentUseCase = inject(ValidateStudentUseCase);

    @Output() next = new EventEmitter<void>();

    identityForm = this.fb.group({
        rude: ['', Validators.required],
        ci: ['', Validators.required]
    });

    isLoading = false;
    error = '';

    onSubmit() {
        if (this.identityForm.valid) {
            this.isLoading = true;
            this.error = '';
            const { rude, ci } = this.identityForm.value;

            this.validateStudentUseCase.execute({ rude: rude!, ci: ci! }).subscribe({
                next: (student) => {
                    this.isLoading = false;
                    if (student) {
                        this.next.emit();
                    } else {
                        this.error = 'Estudiante no encontrado. Verifique sus datos.';
                    }
                },
                error: (err) => {
                    this.isLoading = false;
                    this.error = 'Error de conexión. Intente nuevamente.';
                    console.error(err);
                }
            });
        } else {
            this.identityForm.markAllAsTouched();
        }
    }

    isFieldInvalid(field: string): boolean {
        const control = this.identityForm.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}
