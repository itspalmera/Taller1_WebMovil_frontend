import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductsAdminService } from '../../services/products-admin.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ResponseAPIGetProduct } from '../../Interfaces/ResponseAPI_GetAllProduct';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-list-product',
  imports: [HttpClientModule, CommonModule],
  providers: [ProductsAdminService],
  standalone: true,
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  private productService: ProductsAdminService = inject(ProductsAdminService);
  public products: ResponseAPIGetProduct[] = [];

  @Output() onPageChange = new EventEmitter<number>();
  @Input() currentPage: number = 1;
  
  ngOnInit(): void {
    this.getProducts();
    //console.log(this.currentPage);
  }
  getProducts() {
    this.productService
      .getProducts(this.currentPage)
      .then((products) => {
        this.products = products;
      })
      .catch((error) => {
        console.error('Error al obtener personajes:', error);
      });
  }
  nextPage() {
    this.currentPage++;
    this.getProducts();
    this.onPageChange.emit(this.currentPage);
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
      this.onPageChange.emit(this.currentPage);
    }
  }
}
