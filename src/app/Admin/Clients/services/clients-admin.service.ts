import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIGetAllClients, Result } from '../Interfaces/ResponseAPI_GetAllClients';
import { AuthService } from '../../../tiendaucn/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsAdminService {

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
   * Obtiene todos los clientes de forma paginada.
   * 
   * @param page Número de página para obtener los clientes.
   * @returns Lista de clientes en formato `Result[]`.
   */
  async getAllClients(page: number): Promise<Result[]> {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud GET a la API para obtener todos los clientes
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAllClients>(`${this.baseUrl}User/ViewAllUser/${page}`, { headers })
      );

      // Retornar la lista de resultados (clientes)
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
   * Cambia el estado (activo/inactivo) de un cliente basado en su RUT.
   * 
   * @param rut El RUT del cliente cuyo estado se va a cambiar.
   * @returns El resultado de la operación, que puede ser un mensaje o estado.
   */
  async toggleState(rut: string) {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud PUT a la API para cambiar el estado del cliente
      const response = await firstValueFrom(this.http.put<string>(`${this.baseUrl}User/ToggleUserState/${rut}`, rut, { headers }));

      // Retornar el resultado de la operación
      return response;
    } catch (error) {
      // Manejar el error y almacenarlo en el arreglo de errores
      const httpError = error as HttpErrorResponse;
      this.errors.push(httpError.message);

      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }

  /**
   * Realiza una búsqueda de clientes basada en el nombre o cualquier otro criterio.
   * 
   * @param page Número de página para obtener los clientes.
   * @param searchQuery Consulta de búsqueda (por ejemplo, nombre del cliente).
   * @returns Lista de clientes en formato `Result[]`.
   */
  async searchClient(page: number, searchQuery: string): Promise<Result[]> {
    try {
      // Configurar los encabezados con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });

      // Realizar la solicitud GET a la API para buscar clientes
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAllClients>(`${this.baseUrl}User/SearchUser/${page}&name=${searchQuery}`, { headers })
      );

      // Retornar la lista de resultados (clientes) de la búsqueda
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