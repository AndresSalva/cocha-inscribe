import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SchoolService } from '../../../domain/services/school.service';
import { School } from '../../../domain/models/school.entity';

@Component({
   selector: 'app-catalog',
   standalone: true,
   imports: [CommonModule, RouterLink],
   template: `
    <div class="animate-in pt-16 pb-24 px-6 md:px-0 bg-gray-50 min-h-screen transition-colors duration-300">
      <div class="max-w-7xl mx-auto space-y-12">
      
        <!-- Header -->
        <div class="space-y-4 text-center">
           <h2 class="text-3xl font-black text-institutional text-center uppercase tracking-tight">Catálogo Escolar</h2>
           <p class="text-gray-500 max-w-2xl mx-auto font-medium text-sm">Explora las unidades educativas disponibles para la gestión 2026. Filtra por zona, nivel y especialidad.</p>
           
           <div class="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
             <input type="text" placeholder="Buscar colegio (Ej. enter)..." class="flex-1 px-6 py-3 rounded-xl border border-gray-200 bg-white text-sm font-bold text-institutional focus:outline-none focus:ring-2 focus:ring-institutional/20 shadow-sm" (keydown.enter)="onSearch()" />
             <button class="bg-institutional text-white px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-emerald-900 active:scale-95 transition-all shadow-lg shadow-emerald-900/10" (click)="onSearch()">Buscar</button>
           </div>
        </div>

        <!-- Filters (US-09) -->
        <div class="space-y-4">
           <!-- Zonas -->
           <div class="flex flex-wrap gap-2 justify-center">
              <span class="text-xs font-bold text-gray-400 self-center uppercase mr-2">Zona:</span>
              <button class="px-4 py-2 bg-institutional text-white text-[10px] font-black uppercase rounded-full shadow-lg shadow-emerald-900/20 whitespace-nowrap">Todas</button>
              <button class="px-4 py-2 bg-white text-gray-400 border border-gray-200 hover:text-institutional hover:border-emerald-200 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Norte</button>
              <button class="px-4 py-2 bg-white text-gray-400 border border-gray-200 hover:text-institutional hover:border-emerald-200 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Sur</button>
              <button class="px-4 py-2 bg-white text-gray-400 border border-gray-200 hover:text-institutional hover:border-emerald-200 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Cercado</button>
           </div>

           <!-- Niveles -->
           <div class="flex flex-wrap gap-2 justify-center">
              <span class="text-xs font-bold text-gray-400 self-center uppercase mr-2">Nivel:</span>
              <button class="px-4 py-2 bg-white text-gray-400 border border-gray-200 hover:text-institutional hover:border-emerald-200 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Inicial</button>
              <button class="px-4 py-2 bg-white text-gray-400 border border-gray-200 hover:text-institutional hover:border-emerald-200 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Primaria</button>
              <button class="px-4 py-2 bg-white text-gray-400 border border-gray-200 hover:text-institutional hover:border-emerald-200 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Secundaria</button>
           </div>
           
           <!-- Turnos -->
           <div class="flex flex-wrap gap-2 justify-center">
              <span class="text-xs font-bold text-gray-400 self-center uppercase mr-2">Turno:</span>
              <button class="px-4 py-2 bg-white text-gray-400 border border-gray-200 hover:text-institutional hover:border-emerald-200 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Mañana</button>
              <button class="px-4 py-2 bg-white text-gray-400 border border-gray-200 hover:text-institutional hover:border-emerald-200 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Tarde</button>
           </div>
        </div>

        <!-- Grid (US-03) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
           <!-- Loading State -->
           <div *ngIf="loading()" class="col-span-full py-12 flex justify-center">
                <div class="w-10 h-10 border-4 border-institutional border-t-transparent rounded-full animate-spin"></div>
           </div>

           <!-- School Cards -->
           <div *ngFor="let s of paginatedSchools()" class="bg-white rounded-[2rem] border border-gray-100 p-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
              <div class="aspect-video bg-gray-100 rounded-[1.5rem] overflow-hidden relative cursor-pointer" [routerLink]="['/colegio', s.id]">
                 <img [src]="s.imageUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" [alt]="s.name" />
                 
                 <!-- Status Badge (Hover only as requested) -->
                 <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div *ngIf="s.vacancies > 0" class="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-emerald-600 shadow-sm">
                        Disponible
                     </div>
                     <div *ngIf="s.vacancies === 0" class="bg-red-50 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-red-500 shadow-sm">
                        Sin Cupos
                     </div>
                 </div>
              </div>

              <div class="p-6 space-y-4 flex-1 flex flex-col">
                 <div class="cursor-pointer" [routerLink]="['/colegio', s.id]">
                    <h3 class="text-lg font-black text-institutional leading-tight hover:text-emerald-600 transition-colors">{{ s.name }}</h3>
                    <p class="text-xs text-gray-400 font-bold uppercase tracking-wide mt-1">{{ s.district }} - {{ s.zone }}</p>
                 </div>
                 
                 <div class="flex flex-col gap-2">
                    <!-- Nivel Académico -->
                    <div class="flex flex-wrap gap-2">
                       <span *ngFor="let level of s.levels" class="px-2 py-1 bg-gray-50 rounded-md text-[9px] font-bold text-gray-500 uppercase">{{ level }}</span>
                    </div>
                    <!-- Turno -->
                    <div class="flex items-center gap-1">
                       <span class="material-icons text-[12px] text-gray-400">schedule</span>
                       <span class="text-[10px] font-bold text-gray-500 uppercase">{{ s.shift.join(' / ') }}</span>
                    </div>
                 </div>
                 
                 <div class="pt-2 flex items-center justify-between border-t border-gray-50 mt-auto">
                    <!-- Número de Cupos -->
                    <div class="flex" *ngIf="s.vacancies > 0">
                       <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">{{ s.vacancies }} Cupos Disponibles</span>
                    </div>
                    <div *ngIf="s.vacancies === 0">
                       <span class="text-[10px] font-bold text-red-400 uppercase tracking-wide">0 Cupos</span>
                    </div>

                    <a [routerLink]="['/colegio', s.id]" class="text-[10px] font-black uppercase text-institutional hover:underline cursor-pointer">Ver Detalles &rarr;</a>
                 </div>
              </div>
           </div>

        </div>

        <!-- Pagination (US-03) 3x3 -->
        <div class="flex justify-center items-center gap-2 mt-8" *ngIf="totalPages() > 1">
           <button (click)="setPage(currentPage() - 1)" [disabled]="currentPage() === 1"
                   class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-colors">
              <span class="material-icons text-sm">chevron_left</span>
           </button>
           
           <button *ngFor="let page of totalPagesArray()" (click)="setPage(page)"
                   [class.bg-institutional]="page === currentPage()"
                   [class.text-white]="page === currentPage()"
                   [class.text-gray-600]="page !== currentPage()"
                   [class.bg-white]="page !== currentPage()"
                   class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-xs transition-colors">
              {{ page }}
           </button>

           <button (click)="setPage(currentPage() + 1)" [disabled]="currentPage() === totalPages()"
                   class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-colors">
              <span class="material-icons text-sm">chevron_right</span>
           </button>
        </div>

      </div>
    </div>
  `
})
export class CatalogComponent implements OnInit {
   schools = signal<School[]>([]);
   loading = signal(true);

   // Pagination State
   currentPage = signal(1);
   itemsPerPage = 9; // 3 rows of 3 columns

   // Computed properties for pagination
   paginatedSchools = computed(() => {
      const start = (this.currentPage() - 1) * this.itemsPerPage;
      return this.schools().slice(start, start + this.itemsPerPage);
   });

   totalPages = computed(() => {
      return Math.ceil(this.schools().length / this.itemsPerPage) || 1;
   });

   totalPagesArray = computed(() => {
      return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
   });

   private schoolService = inject(SchoolService);

   ngOnInit() {
      this.loadSchools();
   }

   loadSchools() {
      this.loading.set(true);
      this.schoolService.getAllSchools().subscribe({
         next: (data) => {
            this.schools.set(data);
            this.loading.set(false);
         },
         error: (err) => {
            console.error(err);
            this.loading.set(false);
         }
      })
   }

   setPage(page: number) {
      if (page >= 1 && page <= this.totalPages()) {
         this.currentPage.set(page);
         // Optional: scroll to top of catalog when paginating
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   }

   onSearch() {
      // Search logic simulation
   }
}
