import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './presentation/components/header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    template: `
    <div class="flex flex-col min-h-screen">
      <app-header></app-header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-gray-900 py-12 border-t border-emerald-900/30">
        <div class="max-w-7xl mx-auto px-6 text-center text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed opacity-60">
           &copy; 2026 Gobierno Autónomo Municipal de Cochabamba <br>
           Secretaría de Desarrollo Humano - Dirección de Educación
        </div>
      </footer>
    </div>
  `
})
export class AppComponent { }
