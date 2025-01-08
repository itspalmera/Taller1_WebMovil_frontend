import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseAPIGetAllPurchases, Result } from '../Interfaces/ResponseAPI_GetAllPurchases';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../tiendaucn/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseAdminService {

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
   * Obtiene todas las compras de forma paginada.
   * 
   * @param page Número de página para obtener las compras.
   * @returns Lista de compras en formato `Result[]`.
   */
  async getAllPurchases(page: number): Promise<Result[]> {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud GET a la API para obtener todas las compras
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAllPurchases>(`${this.baseUrl}Purchase/ViewAllPurchase/${page}`, { headers })
      );

      // Retornar la lista de resultados (compras)
      return response.result;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      const httpError = error as HttpErrorResponse;
      this.errors.push(httpError.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }

  /**
   * Realiza una búsqueda de compras con soporte para paginación y ordenación.
   * 
   * @param page Número de página para obtener las compras.
   * @param searchQuery Consulta de búsqueda (por ejemplo, nombre de la compra).
   * @param sort Booleano que indica si la búsqueda debe estar ordenada o no.
   * @returns Lista de compras que coinciden con los criterios de búsqueda en formato `Result[]`.
   */
  async searchPurchase(page: number, searchQuery: string, sort: boolean): Promise<Result[]> {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud GET a la API para buscar compras
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAllPurchases>(`${this.baseUrl}Purchase/SearchPurchase/${page}?name=${searchQuery}&sort=${sort}`, { headers })
      );

      // Retornar la lista de resultados (compras) de la búsqueda
      return response.result;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      const httpError = error as HttpErrorResponse;
      this.errors.push(httpError.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }

  /**
   * Obtiene una compra específica por su ID.
   * 
   * @param id El ID de la compra que se desea obtener.
   * @returns Detalles de la compra con el ID especificado.
   */
  async getPurchaseById(id: number) {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud GET a la API para obtener la compra por ID
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAllPurchases>(`${this.baseUrl}Purchase/GetPurchaseById/${id}`, { headers })
      );

      // Retornar los detalles de la compra
      return response.result;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      const httpError = error as HttpErrorResponse;
      this.errors.push(httpError.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }

  }
  async ViewAllPurchaseClient(page: number): Promise<Result[]> {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });
      console.log(headers);

      // Realizar la solicitud GET a la API para obtener todas las compras
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAllPurchases>(`${this.baseUrl}Purchase/ViewAllPurchaseClient/${page}`, { headers })
      );
      // Retornar la lista de resultados (compras)
      return response.result;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      const httpError = error as HttpErrorResponse;
      this.errors.push(httpError.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }
  async GetPurchaseClientById(id: number) {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud GET a la API para obtener la compra por ID
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAllPurchases>(`${this.baseUrl}Purchase/GetPurchaseClientById/${id}`, { headers })
      );
      console.log(response.result);
      // Retornar los detalles de la compra
      return response.result;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      const httpError = error as HttpErrorResponse;
      this.errors.push(httpError.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }
}
