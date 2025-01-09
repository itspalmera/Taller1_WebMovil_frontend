import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private authService: AuthService) { }

  // URL base de la API
  private baseUrl: string = 'http://localhost:5177/api/';

  // Arreglo para almacenar errores
  public errors: string[] = [];

  // Inyección de HttpClient para realizar solicitudes HTTP
  private http = inject(HttpClient);

  /**
   * Agrega un producto al carrito de compras.
   * 
   * @param productId ID del producto que se desea agregar al carrito.
   * @param quantity Cantidad del producto que se desea agregar.
   * @returns Retorna `true` si el producto fue agregado exitosamente, `false` si hubo algún problema.
   */
  async AddtoCart(productId: number, quantity: number): Promise<boolean> {
    try {
      console.log({ productId, quantity });

      // Realizar la solicitud POST a la API para agregar un producto al carrito
      const result = await firstValueFrom(
        this.http.post<string>(`${this.baseUrl}ShoppingCart/AddToCart`, { quantity, productId }, { withCredentials: true })
      );

      // Retornar `true` si la respuesta fue exitosa
      if (result) {
        return true;
      }

      return false;
    } catch (error) {
      // Manejar el error e imprimirlo en consola
      console.error('Error al agregar al carrito:', error);
      throw error;
    }
  }

  /**
   * Sincroniza el carrito con el servidor.
   * 
   * Este método realiza una solicitud para sincronizar los productos del carrito de compras entre el cliente
   * y el servidor. Se utiliza el token de autenticación del usuario para realizar la solicitud.
   * 
   * @returns Retorna `true` si la sincronización fue exitosa, `false` en caso contrario.
   */
  async SyncCart(): Promise<boolean> {
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      console.log(headers);

      // Realizar la solicitud POST para sincronizar el carrito
      const result = await firstValueFrom(
        this.http.post<string>(`${this.baseUrl}ShoppingCart/SyncCart`, {}, { headers, withCredentials: true, responseType: 'text' as 'json' })
      );

      console.log(result);

      // Retornar `true` si la respuesta fue exitosa
      if (result) {
        return true;
      }

      return false;
    } catch (error) {
      // Manejar el error e imprimirlo en consola
      console.error('Error al sincronizar el carrito:', error);
      throw error;
    }
  }
}