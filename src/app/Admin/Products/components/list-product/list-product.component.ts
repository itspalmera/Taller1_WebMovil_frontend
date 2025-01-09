import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
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

  @Input() currentPage: number = 1;
  @Output() hasMoreProducts: boolean = true; // Notifica al padre si hay más productos disponibles

  private page: number;

  constructor() {
    
    this.page = 0;
  }
  
  ngOnInit(): void {
    this.getProducts();
    if(this.products.length === 10){
      this.hasMoreProducts = true;
    }else{
      this.hasMoreProducts= false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPage']) {
      // Sincroniza la página interna con la página actual desde el padre.
      this.page = this.currentPage;

      // Verifica límites y casos especiales.
      if (this.page < 1) {
        this.page = 1;
      }

      // Lógica para manejar la cantidad de productos en la página actual.
      if (this.products.length < 10 && this.page > 1) {
        this.page = this.page;
      }

      console.log('Página actualizada: ', this.page);

      // Obtiene los productos para la página actual.
      this.getProducts();
      if(this.products.length === 10){
        this.hasMoreProducts = true;
      }else{
        this.hasMoreProducts= false;
      }
    }
  }
  getProducts() {
    this.productService
      .getProducts(this.page)
      .then((products) => {
        this.products = products;
      })
      .catch((error) => {
        console.error('Error al obtener personajes:', error);
      });
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
