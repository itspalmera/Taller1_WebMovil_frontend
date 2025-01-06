import { Component } from '@angular/core';
import { ListProductComponent } from '../../components/list-product/list-product.component';
import { ProductsAdminService } from '../../services/products-admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from '../create-product/create-product.component';
import { FormCreateProductComponent } from '../../components/form-create-product/form-create-product.component';

@Component({
  selector: 'app-products-admin-home',
  imports: [ListProductComponent, CommonModule, FormsModule],
  providers: [ProductsAdminService],
  standalone: true,
  templateUrl: './products-admin-home.component.html',
  styleUrls: ['./products-admin-home.component.css']
})
export class ProductsAdminHomeComponent {
  
  currentPage: number = 1; // Página actual
  searchQuery: string = ''; // Valor del campo de búsqueda
  static currentPage: number;
  hasMore: boolean = true; // Indica si hay más productos en la siguiente página

  prev(): void {
    if (this.currentPage > 1) { // Evita ir a una página menor a 1
      this.currentPage--;
    }
  }
  next(): void {
    if (this.hasMore) {
    this.currentPage++; // Avanza a la siguiente página
    }
  }

  onHasMoreProducts(hasMore: boolean): void {
    this.hasMore = hasMore; // Actualiza el estado según lo emitido por el hijo
    console.log('Has more products: ', hasMore);
  }

}
