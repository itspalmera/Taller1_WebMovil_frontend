import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { user } from '../interfaces/Users/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:5177api/Auth';
  public errors: string[] = [];

  private http = inject(HttpClient);

  //Metodo para iniciar sesion
  // user.service.ts
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<boolean>(`${this.baseUrl}/login`, {
          email,
          password,
        })
      );
      return response;
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

  async getUserProfile(): Promise<user> {
    try {
      return await firstValueFrom(
        this.http.get<user>(`${this.baseUrl}/Profile`)
      );
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      throw error;
    }
  }

  async updateProfile(updatedData: Partial<user>): Promise<boolean> {
    try {
      return await firstValueFrom(
        this.http.put<boolean>(`${this.baseUrl}/EditUser`, updatedData)
      );
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      throw error;
    }
  }
}
