import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PurchaseAdminService } from '../../services/purchase-admin.service';
import { Result } from '../../Interfaces/ResponseAPI_GetAllPurchases';
import { DetailPurchaseComponent } from '../detail-purchase/detail-purchase.component';

@Component({
  selector: 'app-list-purchase',
  imports: [DetailPurchaseComponent,HttpClientModule, CommonModule, FormsModule],
  providers: [PurchaseAdminService],
  standalone: true,
  templateUrl: './list-purchase.component.html',
  styleUrl: './list-purchase.component.css'
})
export class ListPurchaseComponent {
private purchaseService: PurchaseAdminService = inject(PurchaseAdminService);
  public purchases: Result[] = [];
  @Input() currentPage: number = 1;
  private page: number;
  searchQuery: string = ''; // Valor del campo de búsqueda
  sort: boolean = false;
  isModalOpen: boolean = false; // Control de visibilidad del modal
  modalData: Result[] = []; // Datos de la compra seleccionada

  constructor() {
    this.page = 1;
  }

  ngOnInit(): void {
    this.getAllPurchases();
  }

  getAllPurchases(): void {
    this.purchaseService.getAllPurchases(this.page).then((purchases) => {
      this.purchases = purchases;
    }).catch((error) => {
      console.error('Error al obtener clientes:', error);
    });
  }

  openModal(id: number): void {
    this.purchaseService.getPurchaseById(id).then((purchase) => {
      this.modalData = purchase;
      this.isModalOpen = true;
    }).catch((error) => {
      console.error('Error al obtener clientes:', error);
    });
  }
  closeModal(): void {
    this.isModalOpen = false; // Cierra el modal
  }
  getPurchaseSearch(): void {
    this.purchaseService.searchPurchase(this.page,this.searchQuery,this.sort).then((purchases) => {
      this.purchases = purchases;
    }).catch((error) => {
      console.error('Error al obtener clientes:', error);
    });
  }
  prev(): void {

    if (this.page > 1 && this.searchQuery !="") { // Evita ir a una página menor a 1
      this.page--;
      this.getPurchaseSearch();
    }else if(this.page > 1){
      this.page--;
      this.getAllPurchases();

    }
  }
  next(): void {
    if (this.purchases.length === 10 && this.searchQuery !="") {
      this.page++; // Avanza a la siguiente página
      this.getPurchaseSearch();
    }else if(this.purchases.length === 10){
      this.page++; // Avanza a la siguiente página
      this.getAllPurchases();
    }
  }
  onSearch(): void {
    if(this.searchQuery === ""){
      this.getAllPurchases();
    }else{
    this.getAllPurchases()
    }
  }
  
}
