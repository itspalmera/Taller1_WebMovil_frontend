import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsAdminService } from '../../services/clients-admin.service';
import { ListClientComponent } from '../../components/list-client/list-client.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-clients-admin-home',
  imports:[NavbarComponent, ListClientComponent, CommonModule, FormsModule],
  providers: [ClientsAdminService],
  standalone: true,
  templateUrl: './clients-admin-home.component.html',
  styleUrl: './clients-admin-home.component.css'
})
export class ClientsAdminHomeComponent {
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
