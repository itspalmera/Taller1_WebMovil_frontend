import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ListPurchaseComponent } from '../../components/list-purchase/list-purchase.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseAdminService } from '../../services/purchase-admin.service';

@Component({
  selector: 'app-purchases-admin-home',
  imports: [NavbarComponent, ListPurchaseComponent, CommonModule, FormsModule],
  providers: [PurchaseAdminService],
  standalone: true,
  templateUrl: './purchases-admin-home.component.html',
  styleUrl: './purchases-admin-home.component.css'
})
export class PurchasesAdminHomeComponent {

}
