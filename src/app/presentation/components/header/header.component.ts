import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100 dark:border-emerald-900/30 shadow-sm transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <!-- Logo Section -->
        <a routerLink="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div class="w-10 h-10 bg-institutional text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:rotate-3 transition-transform">
             <span class="material-icons text-xl">school</span>
          </div>
          <div class="flex flex-col">
            <h1 class="font-black text-institutional dark:text-white text-lg leading-tight uppercase tracking-tight transition-colors">Cocha-Inscribe</h1>
            <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest leading-none transition-colors">Gobierno Municipal</span>
          </div>
        </a>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-1 bg-gray-50/50 dark:bg-gray-900/50 p-1 rounded-full border border-gray-100 dark:border-gray-800 transition-colors">
           <a routerLink="/" 
              routerLinkActive="bg-white dark:bg-emerald-900/30 text-institutional dark:text-emerald-400 shadow-md" 
              [routerLinkActiveOptions]="{exact: true}"
              class="px-6 py-2 rounded-full text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-institutional dark:hover:text-emerald-300 transition-all uppercase tracking-wider">
              Inicio
           </a>
           <a routerLink="/catalogo" 
              routerLinkActive="bg-white dark:bg-emerald-900/30 text-institutional dark:text-emerald-400 shadow-md"
              class="px-6 py-2 rounded-full text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-institutional dark:hover:text-emerald-300 transition-all uppercase tracking-wider">
              Catálogo
           </a>
           <a routerLink="/inscripcion" 
              routerLinkActive="bg-white dark:bg-emerald-900/30 text-institutional dark:text-emerald-400 shadow-md"
              class="px-6 py-2 rounded-full text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-institutional dark:hover:text-emerald-300 transition-all uppercase tracking-wider">
              Inscripción
           </a>
        </nav>



    <div class="flex items-center gap-3">
        <!-- Theme Toggle -->
        <button (click)="themeService.toggleTheme()" 
                class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors group"
                [attr.title]="themeService.darkMode() ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'">
            <span class="material-icons text-gray-500 dark:text-yellow-400 text-sm group-hover:rotate-12 transition-transform">{{ themeService.darkMode() ? 'light_mode' : 'dark_mode' }}</span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 hidden sm:block">
                {{ themeService.darkMode() ? 'Claro' : 'Oscuro' }}
            </span>
        </button>

        <!-- CTA Button -->
        <a routerLink="/inscripcion" class="hidden md:flex items-center gap-2 bg-institutional hover:bg-emerald-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
           <span>Iniciar Trámite</span>
           <span class="material-icons text-sm">arrow_forward</span>
        </a>
    </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2 text-gray-400 hover:text-institutional transition-colors dark:hover:text-white">
          <span class="material-icons text-2xl">menu</span>
        </button>

      </div>
    </header>
  `
})
export class HeaderComponent {
  protected themeService = inject(ThemeService);
}

