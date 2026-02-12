import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-success-step',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="animate-in text-center space-y-12 py-10 flex flex-col items-center justify-center min-h-[400px]">
      <div class="w-24 h-24 bg-emerald-100 text-emerald-700 rounded-[2.5rem] flex items-center justify-center mx-auto rotate-12 shadow-lg shadow-emerald-500/20 animate-scale-in">
        <span class="material-icons text-5xl -rotate-12 font-black">verified</span>
      </div>
      <div class="space-y-4 max-w-lg mx-auto">
        <h2 class="text-4xl md:text-5xl font-black tracking-tighter text-institutional">Registro SIAE-01 Listo</h2>
        <p class="text-gray-500 font-medium">Su trámite N° 2026-XDF99 ha sido validado biométricamente y guardado exitosamente en nuestra base de datos.</p>
      </div>

      <div class="flex flex-col md:flex-row gap-4">
        <button (click)="downloadReceipt()" class="px-10 py-5 bg-institutional text-white rounded-2xl font-black shadow-xl shadow-emerald-950/20 hover:bg-emerald-900 transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest text-xs">
          <span class="material-icons text-sm">download</span> Descargar Comprobante
        </button>
        <button (click)="goHome()" class="px-10 py-5 bg-white text-gray-500 border border-gray-200 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center gap-2 uppercase tracking-widest text-xs">
          Volver al Inicio
        </button>
      </div>
      
    </div>
  `
})
export class SuccessStepComponent {

    constructor(private router: Router) { }

    downloadReceipt() {
        alert("Descargando PDF...");
        // Stub: Simulate PDF download endpoint
    }

    goHome() {
        this.router.navigate(['/']);
    }
}
