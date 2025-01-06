import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'products-admin',
      loadComponent: () => import('./Admin/Products/pages/products-admin-home/products-admin-home.component').then(m => m.ProductsAdminHomeComponent)
    },
    {
      path: 'edit-product/:id',
      loadComponent: () => import('./Admin/Products/pages/edit-product/edit-product.component').then(m => m.EditProductComponent)  
    },
    {
    path: 'create-product',
    loadComponent: () => import('./Admin/Products/pages/create-product/create-product.component').then(m => m.CreateProductComponent)
    }
  ];
