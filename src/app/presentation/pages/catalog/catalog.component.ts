import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SchoolService } from '../../../domain/services/school.service';
import { School } from '../../../domain/models/school.entity';

@Component({
   selector: 'app-catalog',
   standalone: true,
   imports: [CommonModule, RouterLink],
   template: `
    <div class="animate-in pt-16 pb-24 px-6 md:px-0 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div class="max-w-7xl mx-auto space-y-12">
      
        <!-- Header -->
        <div class="space-y-4 text-center">
           <h2 class="text-3xl font-black text-institutional dark:text-emerald-400 text-center uppercase tracking-tight">Catálogo Escolar</h2>
           <p class="text-gray-500 max-w-2xl mx-auto font-medium text-sm">Explora las unidades educativas disponibles para la gestión 2026. Filtra por zona, nivel y especialidad.</p>
           
           <div class="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
             <input type="text" placeholder="Buscar colegio..." class="flex-1 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-bold text-institutional dark:text-white focus:outline-none focus:ring-2 focus:ring-institutional/20 shadow-sm" />
             <button class="bg-institutional text-white px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-emerald-900 active:scale-95 transition-all shadow-lg shadow-emerald-900/10">Buscar</button>
           </div>
        </div>

        <!-- Filters (Mock) -->
        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center">
           <button class="px-4 py-2 bg-institutional text-white text-[10px] font-black uppercase rounded-full shadow-lg shadow-emerald-900/20 whitespace-nowrap">Todas</button>
           <button class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:text-institutional hover:border-emerald-200 dark:hover:text-emerald-400 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Norte</button>
           <button class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:text-institutional hover:border-emerald-200 dark:hover:text-emerald-400 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Sur</button>
           <button class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:text-institutional hover:border-emerald-200 dark:hover:text-emerald-400 text-[10px] font-black uppercase rounded-full whitespace-nowrap transition-all">Cercado</button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
           <!-- Loading State -->
           <div *ngIf="loading()" class="col-span-full py-12 flex justify-center">
                <div class="w-10 h-10 border-4 border-institutional border-t-transparent rounded-full animate-spin"></div>
           </div>

           <!-- School Cards -->
           <div *ngFor="let s of schools()" class="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 p-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
              <div class="aspect-video bg-gray-100 rounded-[1.5rem] overflow-hidden relative cursor-pointer" [routerLink]="['/colegio', s.id]">
                 <img [src]="s.imageUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" [alt]="s.name" />
                 
                 <!-- Status Badge -->
                 <div *ngIf="s.vacancies > 0" class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-emerald-600 shadow-sm">
                    Disponible
                 </div>
                 <div *ngIf="s.vacancies === 0" class="absolute top-4 right-4 bg-red-50 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-red-500 shadow-sm">
                    Sin Cupos
                 </div>
              </div>

              <div class="p-6 space-y-4 flex-1 flex flex-col">
                 <div class="cursor-pointer" [routerLink]="['/colegio', s.id]">
                    <h3 class="text-lg font-black text-institutional dark:text-white leading-tight hover:text-emerald-600 transition-colors">{{ s.name }}</h3>
                    <p class="text-xs text-gray-400 font-bold uppercase tracking-wide mt-1">{{ s.district }} - {{ s.zone }}</p>
                 </div>
                 
                 <div class="flex flex-wrap gap-2">
                    <span *ngFor="let level of s.levels" class="px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-md text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase">{{ level }}</span>
                 </div>
                 
                 <div class="pt-2 flex items-center justify-between border-t border-gray-50 mt-auto">
                    <div class="flex -space-x-2" *ngIf="s.vacancies > 0">
                       <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">{{ s.vacancies }} Cupos</span>
                    </div>
                    <div *ngIf="s.vacancies === 0">
                       <span class="text-[10px] font-bold text-red-400 uppercase tracking-wide">Lista de Espera</span>
                    </div>

                    <a [routerLink]="['/colegio', s.id]" class="text-[10px] font-black uppercase text-institutional dark:text-emerald-400 hover:underline cursor-pointer">Ver Detalles &rarr;</a>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  `
})
export class CatalogComponent implements OnInit {
   schools = signal<School[]>([]);
   loading = signal(true);

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
}
