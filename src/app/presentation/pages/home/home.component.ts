import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [CommonModule, RouterLink],
   template: `
    <div class="animate-in pt-16 pb-24 px-6 md:px-0 bg-gradient-to-br from-emerald-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 bg-repeat-x min-h-screen transition-colors duration-500">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <!-- Hero Text Content -->
        <div class="space-y-8 animate-in delay-[200ms] text-center md:text-left">
           <div class="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-institutional dark:text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-900/50">
              <span class="w-1.5 h-1.5 bg-institutional dark:bg-emerald-400 rounded-full animate-pulse"></span>
              Periodo de Inscripciones 2026: Abierto
           </div>

           <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-institutional dark:text-white leading-[0.9] tracking-tighter transition-colors duration-300">
             El futuro <br> 
             <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-institutional-light dark:to-emerald-300">académico</span> <br>
             comienza aquí.
           </h1>
           
           <p class="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
             Sistema oficial de inscripciones escolares del GAMC. Rápido, seguro y 100% digital.
           </p>

           <div class="flex flex-col md:flex-row items-center gap-4 pt-4">
              <a routerLink="/inscripcion" class="w-full md:w-auto px-8 py-4 bg-institutional text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-900 shadow-xl shadow-emerald-950/20 transition-all hover:-translate-y-1">
                 <span>INICIAR INSCRIPCIÓN</span>
                 <span class="material-icons text-sm">arrow_forward</span>
              </a>
              <a routerLink="/catalogo" class="w-full md:w-auto px-8 py-4 bg-white dark:bg-white/5 text-institutional dark:text-white border border-emerald-100 dark:border-white/10 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-emerald-300 shadow-sm transition-all text-xs uppercase tracking-widest">
                 Ver Colegios
              </a>
           </div>

           <div class="flex items-center justify-center md:justify-start gap-8 pt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div class="space-y-1">
                 <p class="text-3xl font-black text-institutional">350+</p>
                 <p class="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Unidades Educativas</p>
              </div>
              <div class="w-px h-12 bg-gray-200"></div>
              <div class="space-y-1">
                 <p class="text-3xl font-black text-institutional">12k+</p>
                 <p class="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Estudiantes Inscritos</p>
              </div>
           </div>
        </div>

        <!-- Hero Visuals -->
        <div class="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square bg-emerald-900 rounded-[3rem] border-8 border-white dark:border-white/10 shadow-2xl overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-t from-institutional/90 to-transparent z-10"></div>
            <!-- Placeholder for actual image or dynamic generation -->
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896335477-2858506f970d?q=80&w=2787&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"></div>
            
            <div class="absolute bottom-10 left-10 right-10 z-20 text-white">
                <div class="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                   <div class="flex items-center gap-4 mb-4">
                      <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-institutional font-bold text-xs shadow-lg">JN</div>
                      <div>
                         <p class="font-bold text-sm">Juan Nina</p>
                         <p class="text-[10px] text-white/60 uppercase tracking-widest">Estudiante Destacado</p>
                      </div>
                   </div>
                   <p class="text-xs md:text-sm font-medium leading-relaxed opacity-90">"El proceso fue increíblemente sencillo. Ahora tengo mi cupo asegurado en el colegio de mis sueños."</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent { }
