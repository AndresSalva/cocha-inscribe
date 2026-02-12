import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-documents-step',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="animate-in space-y-10">
      <h2 class="text-3xl font-black text-institutional text-center uppercase tracking-tight">Paso 4: Documentos</h2>
      <p class="text-center text-gray-500 font-medium italic">Por favor, cargue los siguientes documentos para validar la inscripción.</p>

      <div class="grid gap-4 max-w-3xl mx-auto">
        <div *ngFor="let doc of documents" 
             class="p-6 border border-emerald-50 rounded-3xl bg-gray-50 flex items-center justify-between hover:border-emerald-200 transition-all cursor-pointer group shadow-sm hover:shadow-md">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm transition-transform group-hover:scale-110">
              <span class="material-icons" *ngIf="!doc.uploaded">upload_file</span>
              <span class="material-icons text-emerald-600" *ngIf="doc.uploaded">check_circle</span>
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-institutional text-sm">{{ doc.name }}</span>
              <span class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{{ doc.uploaded ? 'Cargado' : 'Pendiente' }}</span>
            </div>
          </div>
          
          <label class="cursor-pointer">
             <input type="file" class="hidden" (change)="uploadDocument($event, doc.id)" [disabled]="doc.uploaded" />
             <span class="material-icons text-gray-300 group-hover:text-emerald-500 transition-colors" *ngIf="!doc.uploaded">add_circle_outline</span>
             <span class="text-xs font-black text-emerald-600 uppercase tracking-widest" *ngIf="doc.uploaded">Listo</span>
          </label>
        </div>
      </div>

      <div class="flex justify-center pt-8">
         <button (click)="onContinue()" [disabled]="!allUploaded()" 
                 class="px-12 py-5 bg-institutional text-white rounded-2xl font-black flex items-center gap-3 hover:bg-emerald-900 shadow-xl shadow-emerald-950/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
           CONTINUAR <span class="material-icons text-sm">east</span>
         </button>
      </div>
    </div>
  `
})
export class DocumentsStepComponent {
    @Output() next = new EventEmitter<void>();

    documents = [
        { id: 'birth_cert', name: 'Certificado de Nacimiento', uploaded: false },
        { id: 'school_record', name: 'Libreta Escolar 2025', uploaded: false },
        { id: 'parent_id', name: 'C.I. Padre/Tutor', uploaded: false }
    ];

    uploadDocument(event: any, docId: string) {
        const file = event.target.files[0];
        if (file) {
            // Simulate upload delay
            setTimeout(() => {
                const doc = this.documents.find(d => d.id === docId);
                if (doc) doc.uploaded = true;
            }, 1000);
        }
    }

    allUploaded() {
        return this.documents.every(d => d.uploaded);
    }

    onContinue() {
        if (this.allUploaded()) {
            this.next.emit();
        }
    }
}
