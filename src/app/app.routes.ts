import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [

  // RUTA PRODUCT LIST (POR DEFECTO)
  {
    path: 'product-list', // Nombre de la ruta
    pathMatch: 'full', // Me redirija a users con cualquier cosa

    // Donde está el componente
    loadComponent: () =>
      import('./tiendaucn/pages/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },

  // ruta change password
  {
    path: 'change-password',
    loadComponent: () =>
      import(
        './tiendaucn/pages/change-password/change-password.component'
      ).then((m) => m.ChangePasswordComponent),
  },

  // ruta delivery
  {
    path: 'delivery-form',
    loadComponent: () =>
      import('./tiendaucn/pages/delivery/delivery.component').then(
        (m) => m.DeliveryComponent
      ),
  },

  //ruta edit profile
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('./tiendaucn/pages/edit-profile/edit-profile.component').then(
        (m) => m.EditProfileComponent
      ),
  },

  // ruta login
  {
    path: 'login',
    loadComponent: () =>
      import('./tiendaucn/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  // ruta Shopping Cart
  {
    path: 'shopping-cart',
    loadComponent: () =>
      import('./tiendaucn/pages/shopping-cart/shopping-cart.component').then(
        (m) => m.ShoppingCartComponent
      ),
  },

  // ruta register
  {
    path: 'register',
    loadComponent: () =>
      import('./tiendaucn/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  // validar que la ruta sea correcta
  {
    path: '', // Cualquier caso que no sea product-list en la URL
    pathMatch: 'full', // Me redirija a product-list con cualquier cosa
    redirectTo: 'product-list', // Redirigir a product-list
  },
  {
    path: 'products-admin',
    loadComponent: () => import('./Admin/Products/pages/products-admin-home/products-admin-home.component').then(m => m.ProductsAdminHomeComponent),
    canActivate: [authGuard],
    data: { role: 'Administrador' }
  },
  {
    path: 'edit-product/:id',
    loadComponent: () => import('./Admin/Products/pages/edit-product/edit-product.component').then(m => m.EditProductComponent),
    canActivate: [authGuard],
    data: { role: 'Administrador' }  
  },
  {
  path: 'create-product',
  loadComponent: () => import('./Admin/Products/pages/create-product/create-product.component').then(m => m.CreateProductComponent),
  canActivate: [authGuard],
  data: { role: 'Administrador' }
  },
  {
    path: 'clients-admin',
    loadComponent: () => import('./Admin/Clients/pages/clients-admin-home/clients-admin-home.component').then(m => m.ClientsAdminHomeComponent),
    canActivate: [authGuard],
    data: { role: 'Administrador' }
  },
  {
    path: '404',
    loadComponent: () => import('./tiendaucn/pages/error404/error404.component').then(m => m.Error404Component)

  }
];

