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
}
