import { Component, inject, Input, Output, SimpleChanges } from '@angular/core';
import { ClientsAdminService } from '../../services/clients-admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResponseAPIGetAllClients, Result } from '../../Interfaces/ResponseAPI_GetAllClients';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-client',
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [ClientsAdminService],
  standalone: true,
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent {
  private clientService: ClientsAdminService = inject(ClientsAdminService);
  public clients: Result[] = [];
  @Input() currentPage: number = 1;
  private page: number;
  searchQuery: string = ''; // Valor del campo de búsqueda

  constructor() {
    this.page = 1;
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(): void {
    this.clientService.getAllClients(this.page).then((clients) => {
      this.clients = clients;
    }).catch((error) => {
      console.error('Error al obtener clientes:', error);
    });
  }
  toggleState(rut: string): void {
    this.clientService.toggleState(rut).then((response) => {
      this.getAllClients();
    }).catch((error) => {
      console.error('Error al cambiar estado del cliente:', error);
    });
  }
  getClientSearch(): void {
    this.clientService.searchClient(this.page,this.searchQuery).then((clients) => {
      this.clients = clients;
    }).catch((error) => {
      console.error('Error al obtener clientes:', error);
    });
  }
  prev(): void {

    if (this.page > 1 && this.searchQuery !="") { // Evita ir a una página menor a 1
      this.page--;
      this.getClientSearch();
    }else if(this.page > 1){
      this.page--;
      this.getAllClients();

    }
  }
  next(): void {
    if (this.clients.length === 10 && this.searchQuery !="") {
      this.page++; // Avanza a la siguiente página
      this.getClientSearch();
    }else if(this.clients.length === 10){
      this.page++; // Avanza a la siguiente página
      this.getAllClients();
    }
  }
  onSearch(): void {
    if(this.searchQuery === ""){
      this.getAllClients();
    }else{
    this.getClientSearch()
    }
  }
}
