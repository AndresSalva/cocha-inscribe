import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentType } from '../../../../../domain/models/document.entity';
import { UploadDocumentUseCase } from '../../../../../domain/usecases/upload-document.usecase';

@Component({
    selector: 'app-document-step',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="animate-in space-y-8 text-center flex flex-col items-center justify-center h-full">
      <h2 class="text-3xl font-black text-institutional uppercase">{{ title }}</h2>
      
      <div class="relative w-full max-w-md mx-auto aspect-[1.586/1] bg-gray-900 rounded-[2rem] border-[6px] border-emerald-50 shadow-2xl overflow-hidden flex items-center justify-center group cursor-pointer transition-transform hover:scale-[1.02]"
           (click)="fileInput.click()">
         
         <!-- Background Preview (if explicitly handled later) -->
         
         <div class="absolute inset-8 border-2 border-dashed border-emerald-400/30 rounded-xl flex flex-col items-center justify-center transition-colors group-hover:border-emerald-400/60">
           <span class="material-icons text-white/20 text-7xl group-hover:text-white/40 transition-colors">credit_card</span>
           <p class="text-white/40 text-[10px] font-black uppercase mt-4 tracking-widest group-hover:text-white/60 transition-colors">
              {{ isLoading ? 'Subiendo...' : 'Toque para capturar' }}
           </p>
        </div>
        
        <!-- Loading Overlay -->
        <div *ngIf="isLoading" class="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>

      <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)" />

      <button (click)="fileInput.click()" [disabled]="isLoading" 
              class="px-12 py-5 bg-institutional text-white rounded-2xl font-black flex items-center gap-3 mx-auto hover:bg-emerald-800 shadow-xl shadow-emerald-950/20 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100">
        <span class="material-icons">photo_camera</span> 
        {{ isLoading ? 'PROCESANDO...' : 'CAPTURAR IMAGEN' }}
      </button>
      
      <p class="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
        Asegúrese de que el documento esté bien iluminado y legible.
      </p>
    </div>
  `
})
export class DocumentStepComponent {
    @Input() title: string = 'Documento';
    @Input() type: string = 'generic'; // Mapped to DocumentType internally if needed
    @Output() next = new EventEmitter<void>();

    private uploadUseCase = inject(UploadDocumentUseCase);

    isLoading = false;

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.uploadFile(input.files[0]);
        }
    }

    uploadFile(file: File) {
        this.isLoading = true;
        // Map string type to Enum if strictly needed, for now casting or using generic
        // In a real app, map 'front' -> DocumentType.STUDENT_ID_FRONT

        this.uploadUseCase.execute({ file, type: DocumentType.STUDENT_ID_FRONT }).subscribe({
            next: (doc) => {
                // Simulate delay for effect
                setTimeout(() => {
                    this.isLoading = false;
                    this.next.emit();
                }, 1500);
            },
            error: (err) => {
                this.isLoading = false;
                console.error(err);
                alert('Error al subir imagen');
            }
        });
    }
}
