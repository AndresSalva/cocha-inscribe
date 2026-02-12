import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-biometric-step',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="animate-in text-center space-y-10 flex flex-col items-center justify-center min-h-[400px]">
      <h2 class="text-3xl font-black text-institutional uppercase tracking-tight">Paso 5: Biometría Facial</h2>
      <p class="text-gray-500 font-medium max-w-md mx-auto">Para finalizar, necesitamos verificar su identidad biométricamente.</p>

      <div class="relative w-64 h-64 mx-auto bg-gray-950 rounded-full border-[8px] border-emerald-50 flex items-center justify-center overflow-hidden shadow-2xl group cursor-pointer transition-transform hover:scale-105" (click)="toggleScan()">
        
        <!-- Video Placeholder / Camera Feed Simulation -->
        <div class="absolute inset-0 bg-gray-900 flex items-center justify-center">
             <span class="material-icons text-[120px] text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">face</span>
        </div>

        <!-- Scanning Overlay -->
        <div *ngIf="isScanning" class="absolute inset-0 border-4 border-emerald-500 border-t-transparent animate-spin rounded-full opacity-80 z-20"></div>
        <div *ngIf="isScanning" class="absolute inset-x-0 h-1 bg-emerald-400/50 animate-pulse top-1/2 z-10 blur-md"></div>
        
        <!-- Success Overlay -->
        <div *ngIf="isSuccess" class="absolute inset-0 bg-emerald-500/90 flex items-center justify-center z-30 animate-in">
            <span class="material-icons text-6xl text-white font-black animate-bounce">check_circle</span>
        </div>

      </div>

      <div class="flex flex-col gap-2 items-center">
         <button (click)="startVerify()" [disabled]="isScanning || isSuccess" 
                 class="px-12 py-5 bg-institutional text-white rounded-2xl font-black hover:bg-emerald-900 shadow-xl shadow-emerald-950/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs flex items-center gap-2">
           <span class="material-icons text-sm">center_focus_strong</span>
           {{ isScanning ? 'Escaneando...' : (isSuccess ? 'Verificado' : 'Procesar Rostro') }}
         </button>
         <p class="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-2" *ngIf="isSuccess">Redireccionando...</p>
      </div>

    </div>
  `
})
export class BiometricStepComponent {
    @Output() next = new EventEmitter<void>();

    isScanning = false;
    isSuccess = false;

    toggleScan() {
        if (!this.isSuccess && !this.isScanning) {
            this.startVerify();
        }
    }

    startVerify() {
        this.isScanning = true;

        // Stub: Simulate API call to biometric verification endpoint
        setTimeout(() => {
            this.isScanning = false;
            this.isSuccess = true;

            setTimeout(() => {
                this.next.emit();
            }, 1500); // Wait a bit to show success checkmark

        }, 3000);
    }
}
