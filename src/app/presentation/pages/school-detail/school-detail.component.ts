import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SchoolService } from '../../../domain/services/school.service';
import { School } from '../../../domain/models/school.entity';

@Component({
    selector: 'app-school-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="min-h-screen bg-gray-50 pb-20 transition-colors duration-300">
      
      <!-- Loading State -->
      <div *ngIf="loading()" class="h-screen flex flex-col items-center justify-center gap-4 text-institutional">
          <div class="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
          <span class="font-bold uppercase tracking-widest text-xs">Cargando información...</span>
      </div>

      <!-- Content -->
      <div *ngIf="!loading() && school() as s" class="animate-in group/main">
          
          <!-- Header / Hero Image -->
          <div class="relative h-[40vh] md:h-[50vh] bg-emerald-900 overflow-hidden">
               <img [src]="s.imageUrl" class="w-full h-full object-cover opacity-60" [alt]="s.name">
               <div class="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent"></div>
               
               <!-- Hover Status Over Image (US-06) -->
               <div class="absolute top-6 right-6 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300">
                    <div *ngIf="s.vacancies > 0" class="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-emerald-600 shadow-xl">
                        {{ s.vacancies }} Cupos Disponibles
                    </div>
                    <div *ngIf="s.vacancies === 0" class="bg-red-50 backdrop-blur px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-red-500 shadow-xl">
                        Sin Cupos
                    </div>
               </div>

               <div class="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
                    <div class="flex flex-col md:flex-row md:items-end gap-6 justify-between">
                        <div class="space-y-4">
                             <!-- Chips Tipo - Turno -->
                             <div class="flex gap-3">
                                <span class="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-[10px] font-black uppercase tracking-widest">SIE: {{ s.sie }}</span>
                                <span class="px-3 py-1 bg-emerald-500 rounded-full text-white text-[10px] font-black uppercase tracking-widest">{{ s.district }}</span>
                                <span class="px-3 py-1 bg-blue-500 rounded-full text-white text-[10px] font-black uppercase tracking-widest">{{ s.type }}</span>
                                <span class="px-3 py-1 bg-orange-400 rounded-full text-white text-[10px] font-black uppercase tracking-widest">{{ s.shift[0] }}</span>
                             </div>
                             <h1 class="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">{{ s.name }}</h1>
                             <p class="text-white/80 font-medium max-w-2xl flex items-center gap-2">
                                <span class="material-icons text-sm">location_on</span>
                                {{ s.address }}
                             </p>
                        </div>
                        
                        <a routerLink="/inscripcion" class="px-8 py-4 bg-white text-institutional hover:bg-emerald-50 rounded-2xl font-black shadow-xl transition-all active:scale-95 flex items-center gap-3 w-fit uppercase tracking-widest text-xs">
                           <span>Solicitar Cupo</span>
                           <span class="material-icons text-sm">arrow_forward</span>
                        </a>
                    </div>
               </div>
          </div>

          <!-- Body -->
          <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
               
               <!-- Left Column: Details -->
               <div class="lg:col-span-2 space-y-12">
                   <section class="space-y-6">
                       <h2 class="text-2xl font-black text-institutional uppercase tracking-tight flex items-center gap-3">
                           <span class="material-icons">info</span>
                           Sobre la Unidad Educativa
                       </h2>
                       <p class="text-gray-600 leading-relaxed text-lg">{{ s.description }}</p>
                   </section>

                   <section class="space-y-6">
                       <h2 class="text-2xl font-black text-institutional uppercase tracking-tight flex items-center gap-3">
                           <span class="material-icons">school</span>
                           Oferta Académica
                       </h2>
                       <div class="flex flex-wrap gap-3">
                           <div *ngFor="let level of s.levels" class="px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-3">
                               <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-institutional font-bold text-lg hover:scale-110 transition-transform">
                                   {{ level[0] }}
                               </div>
                               <span class="font-bold text-gray-700">{{ level }}</span>
                           </div>
                       </div>
                   </section>

                    <!-- Map Stub -->
                   <section class="space-y-6">
                       <h2 class="text-2xl font-black text-institutional uppercase tracking-tight flex items-center gap-3">
                           <span class="material-icons">map</span>
                           Ubicación Local
                       </h2>
                       <div class="bg-gray-200 rounded-3xl h-64 flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-300">
                           <p>Mapa Interactivo (Ubicado en {{ s.zone }})</p>
                       </div>
                   </section>
               </div>

               <!-- Right Column: Stats -->
               <div class="space-y-6">
                   <div class="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 sticky top-24 space-y-8">
                        <div>
                            <p class="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Cupos Disponibles</p>
                            <p class="text-6xl font-black text-institutional">{{ s.vacancies }}</p>
                        </div>
                        
                        <div class="w-full h-px bg-gray-100"></div>

                        <!-- Full Atributtes (US-06) -->
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-bold text-gray-500">Zona</span>
                                <span class="text-sm font-black text-institutional text-right">{{ s.zone }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-bold text-gray-500">Turnos</span>
                                <span class="text-sm font-black text-institutional text-right">{{ s.shift.join(' / ') }}</span>
                            </div>
                            <!-- Agregado: Horario -->
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-bold text-gray-500">Horario Máñ.</span>
                                <span class="text-sm font-black text-institutional text-right text-xs">{{ s.schedule.slice(0, 16) }}...</span>
                            </div>
                            <!-- Agregado: is_private -->
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-bold text-gray-500">Tipo de Instit.</span>
                                <span class="text-sm font-black text-institutional text-right">{{ s.type }}</span>
                            </div>
                            <!-- Agregado: price -->
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-bold text-gray-500">Mensualidad</span>
                                <span class="text-sm font-black text-institutional text-right">{{ s.price === 0 ? 'Gratuito' : 'Bs. ' + s.price }}</span>
                            </div>
                        </div>

                        <div class="pt-4">
                             <button *ngIf="s.vacancies > 0" class="w-full py-4 bg-emerald-500 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-colors">
                                 Ver Requisitos
                             </button>
                             <button *ngIf="s.vacancies === 0" disabled class="w-full py-4 bg-gray-100 text-gray-400 rounded-xl font-black uppercase text-xs tracking-widest cursor-not-allowed">
                                 Sin Cupos
                             </button>
                        </div>
                   </div>
               </div>

          </div>
      </div>
      
      <!-- Not Found State -->
      <div *ngIf="!loading() && !school()" class="h-[50vh] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-bold text-gray-400">Colegio no encontrado</h2>
        <a routerLink="/catalogo" class="text-institutional font-bold mt-4 hover:underline">Volver al catálogo</a>
      </div>

    </div>
  `
})
export class SchoolDetailComponent implements OnInit {
    school = signal<School | undefined>(undefined);
    loading = signal(true);

    private route = inject(ActivatedRoute);
    private schoolService = inject(SchoolService);

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.loadSchool(id);
            }
        });
    }

    loadSchool(id: string) {
        this.loading.set(true);
        this.schoolService.getSchoolById(id).subscribe({
            next: (data) => {
                this.school.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
