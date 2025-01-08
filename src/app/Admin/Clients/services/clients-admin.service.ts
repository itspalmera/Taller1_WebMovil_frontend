import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIGetAllClients, Result } from '../Interfaces/ResponseAPI_GetAllClients';
import { AuthService } from '../../../tiendaucn/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsAdminService {

  constructor(private authService:AuthService) { }
  private baseUrl = 'http://localhost:5177/api/';
    private http = inject(HttpClient);
    public errors: string[] = [];
    public page: number = 1;

    async getAllClients(page: number): Promise<Result[]> {
      try {
        const headers = new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
              });
        const response = await firstValueFrom(
          this.http.get<ResponseAPIGetAllClients>(`${this.baseUrl}User/ViewAllUser/${page}`,{ headers }))
          return response.result;
      } catch (error) {
        const httpError = error as HttpErrorResponse;
        this.errors.push(httpError.message);
        return Promise.reject(error);
      }
    }
    async toggleState(rut: string) {
      try {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
        });
        const response = await firstValueFrom(this.http.put<string>(`${this.baseUrl}User/ToggleUserState/${rut}`,rut,{ headers }))
        return response;
      } catch (error) {
        const httpError = error as HttpErrorResponse;
        this.errors.push(httpError.message);
        return Promise.reject(error);
      }
    }
    async searchClient(page:number,searchQuery: string): Promise<Result[]> {
      try {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
        });
        const response = await firstValueFrom(
          this.http.get<ResponseAPIGetAllClients>(`${this.baseUrl}User/SearchUser/${page}&name=${searchQuery}`,{ headers }))
          return response.result;
      } catch (error) {
        const httpError = error as HttpErrorResponse;
        this.errors.push(httpError.message);
        return Promise.reject(error);
      }
    }
}

