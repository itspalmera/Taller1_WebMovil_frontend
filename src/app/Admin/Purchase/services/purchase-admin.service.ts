import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseAPIGetAllPurchases, Result } from '../Interfaces/ResponseAPI_GetAllPurchases';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../tiendaucn/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseAdminService {

  constructor(private authService:AuthService) { }
  private baseUrl = 'http://localhost:5177/api/';
  private http = inject(HttpClient);
  public errors: string[] = [];
  public page: number = 1;

  


  async getAllPurchases(page: number): Promise<Result[]> {
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });
      const response = await firstValueFrom(
        
      this.http.get<ResponseAPIGetAllPurchases>(`${this.baseUrl}Purchase/ViewAllPurchase/${page}`,{ headers }))
      return response.result;
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      this.errors.push(httpError.message);
      return Promise.reject(error);
    }
  }
  async searchPurchase(page:number,searchQuery: string,sort:boolean): Promise<Result[]> {
        try {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
          });
          const response = await firstValueFrom(
            this.http.get<ResponseAPIGetAllPurchases>(`${this.baseUrl}Purchase/SearchPurchase/${page}?name=${searchQuery}&sort=${sort}`,{ headers }))
          return response.result;
        } catch (error) {
          const httpError = error as HttpErrorResponse;
          this.errors.push(httpError.message);
          return Promise.reject(error);
        }
      }
      async getPurchaseById(id: number) {
        try {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
          });
          const response = await firstValueFrom(
            this.http.get<ResponseAPIGetAllPurchases>(`${this.baseUrl}Purchase/GetPurchaseById/${id}`,{ headers }))
          return response.result;
        } catch (error) {
          const httpError = error as HttpErrorResponse;
          this.errors.push(httpError.message);
          return Promise.reject(error);
        }
      }
}
