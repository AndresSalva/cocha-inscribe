import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [CommonModule, RouterLink],
   template: `
    <div class="animate-in pt-16 pb-24 px-6 md:px-0 bg-gradient-to-br from-emerald-50 via-white to-gray-50 bg-repeat-x min-h-screen transition-colors duration-500">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <!-- Hero Text Content -->
        <div class="space-y-8 animate-in delay-[200ms] text-center md:text-left">
           <div class="inline-flex items-center gap-2 bg-emerald-100 text-institutional px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
              <span class="w-1.5 h-1.5 bg-institutional rounded-full animate-pulse"></span>
              Periodo de Inscripciones 2026: Abierto
           </div>

           <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-institutional leading-[0.9] tracking-tighter transition-colors duration-300">
             El futuro <br> 
             <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-institutional-light">académico</span> <br>
             comienza aquí.
           </h1>
           
           <p class="text-gray-500 font-medium text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
             Sistema oficial de inscripciones escolares del Gobierno Autónomo Municipal de Cochabamba. Rápido, seguro y 100% digital.
           </p>

           <div class="flex flex-col md:flex-row items-center gap-4 pt-4">
              <a routerLink="/inscripcion" class="w-full md:w-auto px-8 py-4 bg-institutional text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-900 shadow-xl shadow-emerald-950/20 transition-all hover:-translate-y-1">
                 <span>INICIAR INSCRIPCIÓN</span>
                 <span class="material-icons text-sm">arrow_forward</span>
              </a>
              <a routerLink="/catalogo" class="w-full md:w-auto px-8 py-4 bg-white text-institutional border border-emerald-100 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-emerald-300 shadow-sm transition-all text-xs uppercase tracking-widest">
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
                 <p class="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Cupos Disponibles</p>
              </div>
           </div>
        </div>

        <!-- Hero Visuals -->
        <div class="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square bg-emerald-900 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-t from-institutional/90 to-transparent z-10"></div>
            <!-- School Context Image -->
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896335477-2858506f970d?q=80&w=2787&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"></div>
            
            <div class="absolute bottom-10 left-10 right-10 z-20 text-white">
                <div class="bg-[#004b3b]/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 flex flex-col gap-4 shadow-2xl">
                   
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                          <span class="material-icons text-3xl">verified</span>
                      </div>
                      <div>
                          <h3 class="font-black text-2xl tracking-tight text-white shadow-sm">Trámite 100% Digital</h3>
                      </div>
                   </div>

                   <div class="w-full h-px bg-gradient-to-r from-white/20 to-transparent my-2"></div>

                   <p class="text-sm font-medium leading-relaxed opacity-90 text-emerald-50">
                     Evita las filas. Asegura el cupo escolar desde la comodidad de tu hogar con la garantía y respaldo del GAMC.
                   </p>

                   <div class="grid grid-cols-2 gap-3 mt-2">
                      <div class="flex items-center gap-2">
                         <span class="material-icons text-emerald-400 text-sm">check_circle</span>
                         <span class="text-xs font-bold text-white/80 uppercase tracking-wider">Gratuito</span>
                      </div>
                      <div class="flex items-center gap-2">
                         <span class="material-icons text-emerald-400 text-sm">check_circle</span>
                         <span class="text-xs font-bold text-white/80 uppercase tracking-wider">Seguro</span>
                      </div>
                      <div class="flex items-center gap-2">
                         <span class="material-icons text-emerald-400 text-sm">check_circle</span>
                         <span class="text-xs font-bold text-white/80 uppercase tracking-wider">Inmediato</span>
                      </div>
                      <div class="flex items-center gap-2">
                         <span class="material-icons text-emerald-400 text-sm">check_circle</span>
                         <span class="text-xs font-bold text-white/80 uppercase tracking-wider">Respaldado</span>
                      </div>
                   </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent { }
