import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./presentation/pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'catalogo',
        loadComponent: () => import('./presentation/pages/catalog/catalog.component').then(m => m.CatalogComponent)
    },
    {
        path: 'colegio/:id',
        loadComponent: () => import('./presentation/pages/school-detail/school-detail.component').then(m => m.SchoolDetailComponent)
    },
    {
        path: 'inscripcion',
        loadComponent: () => import('./presentation/pages/wizard/wizard.component').then(m => m.WizardComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
