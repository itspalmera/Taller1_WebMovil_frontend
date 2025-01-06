import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

//import { Product } from '../intefaces/product';
import { APIGetAllProducts } from '../interfaces//GetAllProduct/API_GetAllProducts';
import { Product } from '../interfaces/GetAllProduct/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:5177/api';

  private http = inject(HttpClient);
  public errors: string[] = [];

  async getAllProducts(
    text?: string,
    category?: string,
    sort?: string
  ): Promise<Product[]> {
    try {
      let params = new HttpParams();
      if (text) {
        params = params.set('text', text);
      }
      if (category) {
        params = params.set('category', category);
      }
      if (sort) {
        params = params.set('sort', sort);
      }

      const response = await firstValueFrom(
        this.http.get<Product[]>(`${this.baseUrl}/Product`, { params })
      );
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en getAllProducts', error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  /*
  async getProductById(id: number): Promise<Product> {
    try {
      const response = await firstValueFrom(
        this.http.get<Product>(`${this.baseUrl}/Product/${id}`)
      );
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en getProductById', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
*/

  getErrors(): string[] {
    return this.errors;
  }
}
