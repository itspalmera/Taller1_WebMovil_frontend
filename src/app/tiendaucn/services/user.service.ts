import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { user } from '../interfaces/Users/user';
import { Login } from '../interfaces/Auth/Login';
import { LoginResponse } from '../interfaces/Auth/ResponseAPI_Login';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:5177/api/Auth';
  public errors: string[] = [];

  private http = inject(HttpClient);

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