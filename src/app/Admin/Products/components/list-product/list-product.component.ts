import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductsAdminService } from '../../services/products-admin.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ResponseAPIGetProduct } from '../../Interfaces/ResponseAPI_GetAllProduct';

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
  showDeleteModal = false;
  productToDelete: string | null = null;

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
  deleteProduct() {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete).then(() => {
        // Elimina el producto de la lista localmente
        this.products = this.products.filter(product => product.id !== this.productToDelete);
        this.closeDeleteModal(); // Cierra el modal después de la eliminación
      }).catch((error) => {
        console.error('Error al eliminar el producto', error);
      });
    }
    window.location.reload();
  }
  // Abre el modal y guarda el producto a eliminar
  openDeleteConfirmation(productId: string) {
    this.productToDelete = productId;
    this.showDeleteModal = true;
  }
  // Cierra el modal
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }
}
