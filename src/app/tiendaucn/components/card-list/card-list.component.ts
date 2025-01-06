import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardProductComponent } from "../card-product/card-product.component";
import { NavbarProductComponent } from "../navbar-product/navbar-product.component";
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/GetAllProduct/Product';

@Component({
  selector: 'card-list',
  imports: [
    CardProductComponent,
    NavbarProductComponent,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  async getAllProducts(text?: string, category?: string, sort?: string) {
    try {
      const response = await this.productService.getAllProducts(
        text,
        category,
        sort
      );
      this.products = response; // Obtener todos los productos o productos filtrados
    } catch (error) {
      console.error('Error fetching products', error);
    }
  }

  updateProducts(products: Product[]) {
    this.products = products; // Actualizar la lista de productos
  }



}
