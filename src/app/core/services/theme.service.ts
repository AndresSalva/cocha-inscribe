
import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    darkMode = signal<boolean>(false);

    constructor() {
        this.initTheme();
    }

    private initTheme() {
        // Check localStorage or system preference
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            this.darkMode.set(true);
            document.documentElement.classList.add('dark');
        } else {
            this.darkMode.set(false);
            document.documentElement.classList.remove('dark');
        }
    }

    toggleTheme() {
        this.darkMode.update(v => !v);
        if (this.darkMode()) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }
}
