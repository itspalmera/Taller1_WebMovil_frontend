import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../interfaces/Auth/Login';
import { firstValueFrom } from 'rxjs';
import { LoginResponse } from '../interfaces/Auth/ResponseAPI_Login';
import { user } from '../interfaces/Users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:5177/api/Auth';
  public errors: string[] = [];

  private http = inject(HttpClient);

  //Metodo para iniciar sesion
  async login(login: Login): Promise<string> {
    try {
      console.log('Login data:', login);
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.baseUrl}/login`, login));
      // Guardamos el token en una cookie por 1 día
      this.setCookie("auth_token", response.token, 1);

      return response.token;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  }

  //Metodo para registrar usuario
  async register(userData: user): Promise<boolean> {
    try {
      // Envía todos los campos requeridos por el backend
      const response = await firstValueFrom(
        this.http.post<boolean>(`${this.baseUrl}/Register`, userData)
      );
      return response; // Retorna directamente la respuesta
    } catch (error) {
      // Maneja el error de forma robusta
      if (error instanceof HttpErrorResponse) {
        console.error('Error en el registro:', error.message);
        throw new Error(`Error en el registro: ${error.message}`);
      }
      console.error('Error desconocido:', error);
      throw new Error('Error inesperado en el registro.');
    }
  }

  isAdmin():boolean{
    const token = this.getCookie("auth_token");
    if (!token) {
      return false;
    }
    const decodedToken = this.decodeToken(token);
    return decodedToken.role === 'Administrador';
  }

  setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // Definir la expiración de la cookie
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;  // Guardar la cookie
  }
  // Recuperar el token desde la cookie
  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Eliminar espacios
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;  // Si no existe, retorna null
  }
  // Eliminar la cookie
  deleteCookie(name: string): void {
    document.cookie = name + '=; Max-Age=-99999999;';  // Eliminar la cookie
  }
  // Función para decodificar el token
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }
}
