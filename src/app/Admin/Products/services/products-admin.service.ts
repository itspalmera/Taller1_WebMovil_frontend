import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseAPIGetProduct } from '../Interfaces/ResponseAPI_GetAllProduct';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ResponseAPIGetCategory } from '../Interfaces/ResponseAPI_GetCategory';
import { ResponseAPIGetOnlyProduct } from '../Interfaces/ResponseAPI_GetProduct';
import { Product } from '../Interfaces/Product';
import { AuthService } from '../../../tiendaucn/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsAdminService {

  // Constructor que inyecta el servicio de autenticación
  constructor(private authService: AuthService) { }

  // URL base de la API
  private baseUrl = 'http://localhost:5177/api/';

  // Inyección de HttpClient para realizar solicitudes HTTP
  private http = inject(HttpClient);

  // Arreglo para almacenar errores
  public errors: string[] = [];

  // Página actual para la paginación
  public page: number = 1;

  /**
   * Obtiene los productos de la base de datos de forma paginada.
   * 
   * @param page Número de página para obtener productos.
   * @returns Lista de productos en formato `ResponseAPIGetProduct[]`.
   */
  async getProducts(page: number) {
    try {
      // Configurar los encabezados, incluyendo el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud GET a la API para obtener los productos
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetProduct[]>(`${this.baseUrl}Product/GetAllProduct/${page}`, { headers })
      );

      // Retornar la respuesta exitosa
      return response;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }

  /**
   * Obtiene un solo producto por su ID.
   * 
   * @param productId El ID del producto a obtener.
   * @returns El producto con el ID especificado en formato `ResponseAPIGetOnlyProduct`.
   */
  async getProduct(productId: string) {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud GET a la API para obtener el producto por ID
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetOnlyProduct>(`${this.baseUrl}Product/${productId}`, { headers })
      );

      // Retornar el producto encontrado
      return response;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      let e = error as HttpErrorResponse;
      this.errors.push(e.statusText);

      // Rechazar la promesa con el código de error
      return Promise.reject(e.status);
    }
  }

  /**
   * Obtiene todas las categorías de productos disponibles.
   * 
   * @returns Lista de categorías en formato `ResponseAPIGetCategory`.
   */
  async getCategory() {
    try {
      // Realizar la solicitud GET a la API para obtener las categorías
      const response = await firstValueFrom(this.http.get<ResponseAPIGetCategory>(`${this.baseUrl}Category/GetCategory`));

      // Retornar la respuesta con las categorías
      return response;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }

  /**
   * Actualiza los detalles de un producto existente.
   * 
   * @param product Objeto que contiene los datos del producto actualizado.
   * @param id El ID del producto a actualizar.
   * @returns El producto actualizado en formato `Product`.
   */
  async updateProduct(product: Product, id: string) {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud PUT a la API para actualizar el producto
      const response = await firstValueFrom(this.http.put<Product>(`${this.baseUrl}Product/${id}`, product, { headers }));

      // Retornar el producto actualizado
      return response;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }

  /**
   * Crea un nuevo producto.
   * 
   * @param product Objeto que contiene los datos del nuevo producto.
   * @returns El producto creado en formato `Product`.
   */
  async createProduct(product: Product) {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud POST a la API para crear el producto
      const response = await firstValueFrom(this.http.post<Product>(`${this.baseUrl}Product`, product, { headers }));

      // Retornar el producto creado
      return response;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }

  /**
   * Elimina un producto existente por su ID.
   * 
   * @param id El ID del producto a eliminar.
   * @returns La respuesta de la eliminación del producto.
   */
  async deleteProduct(id: string) {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud DELETE a la API para eliminar el producto
      const response = await firstValueFrom(this.http.delete<Product>(`${this.baseUrl}Product/${id}`, { headers }));

      // Retornar la respuesta de la eliminación
      return response;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }
}