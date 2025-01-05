import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseAPIGetProduct } from '../Interfaces/ResponseAPI_GetAllProduct';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsAdminService {

  constructor() { }
  private baseUrl = 'http://localhost:5177/api/Product/';
  private http = inject(HttpClient);
  public errors: string[] = [];
  public page: number = 1;

  async getProducts(page: number) {
    try {
      const response= await firstValueFrom(
        this.http.get<ResponseAPIGetProduct[]>(`${this.baseUrl}GetAllProduct/${page}`)
      );
      return response;
    } catch (error) {
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
