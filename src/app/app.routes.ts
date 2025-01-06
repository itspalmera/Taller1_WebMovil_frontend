import { Routes } from '@angular/router';

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
];
