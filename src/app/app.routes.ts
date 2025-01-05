import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'products-admin',
      loadComponent: () => import('./Admin/Products/pages/products-admin-home/products-admin-home.component').then(m => m.ProductsAdminHomeComponent)
    }
  ];
