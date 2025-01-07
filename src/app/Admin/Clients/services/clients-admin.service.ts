import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIGetAllClients, Result } from '../Interfaces/ResponseAPI_GetAllClients';

@Injectable({
  providedIn: 'root'
})
export class ClientsAdminService {

  constructor() { }
  private baseUrl = 'http://localhost:5177/api/';
    private http = inject(HttpClient);
    public errors: string[] = [];
    public page: number = 1;

    async getAllClients(page: number): Promise<Result[]> {
      try {
        const response = await firstValueFrom(
          this.http.get<ResponseAPIGetAllClients>(`${this.baseUrl}User/ViewAllUser/${page}`)
        );
        return response.result;
      } catch (error) {
        const httpError = error as HttpErrorResponse;
        this.errors.push(httpError.message);
        return Promise.reject(error);
      }
    }
    async toggleState(rut: string) {
      try {
        const response = await firstValueFrom(this.http.put<string>(`${this.baseUrl}User/ToggleUserState/${rut}`,rut));
        return response;
      } catch (error) {
        const httpError = error as HttpErrorResponse;
        this.errors.push(httpError.message);
        return Promise.reject(error);
      }
    }
    async searchClient(page:number,searchQuery: string): Promise<Result[]> {
      try {
        const response = await firstValueFrom(
          this.http.get<ResponseAPIGetAllClients>(`${this.baseUrl}User/SearchUser/${page}&name=${searchQuery}`)
        );
        return response.result;
      } catch (error) {
        const httpError = error as HttpErrorResponse;
        this.errors.push(httpError.message);
        return Promise.reject(error);
      }
    }
}

