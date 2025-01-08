import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseAPIGetProduct } from '../Interfaces/ResponseAPI_GetAllProduct';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ResponseAPIGetCategory } from '../Interfaces/ResponseAPI_GetCategory';
import { ResponseAPIGetOnlyProduct } from '../Interfaces/ResponseAPI_GetProduct';
import { Product } from '../Interfaces/Product';
import { AuthService } from '../../../tiendaucn/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsAdminService {

  constructor(private authService:AuthService) { }
  private baseUrl = 'http://localhost:5177/api/';
  private http = inject(HttpClient);
  public errors: string[] = [];
  public page: number = 1;



  async getProducts(page: number) {
    try {
      const headers = new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
            });
      const response= await firstValueFrom(
        this.http.get<ResponseAPIGetProduct[]>(`${this.baseUrl}Product/GetAllProduct/${page}`,{ headers }))
        return response;
    } catch (error) {
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
  async getProduct(productId: string) {
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });
      const response= await firstValueFrom(
        this.http.get<ResponseAPIGetOnlyProduct>(`${this.baseUrl}Product/${productId}`,{ headers }))
        return response;
    } catch (error) {
      let e = error as HttpErrorResponse;
      this.errors.push(e.statusText);
      return Promise.reject(e.status);
    }
  }
  async getCategory(){
    try{
      const response = await firstValueFrom(this.http.get<ResponseAPIGetCategory>(`${this.baseUrl}Category/GetCategory`));
      return response;
    }catch(error) {
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
  async updateProduct(product: Product, id: string) {
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });
      const response = await firstValueFrom(this.http.put<Product>(`${this.baseUrl}Product/${id}`, product,{ headers }))
      return response;
    } catch (error) {
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
  async createProduct(product: Product) {
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });
      const response = await firstValueFrom(this.http.post<Product>(`${this.baseUrl}Product`, product,{ headers }))
      return response;
    } catch (error) {
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  
  async deleteProduct(id: string) {
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getCookie("auth_token")}`
      });
      const response = await firstValueFrom(this.http.delete<Product>(`${this.baseUrl}Product/${id}`,{ headers }))
      return response;
    } catch (error) {
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
