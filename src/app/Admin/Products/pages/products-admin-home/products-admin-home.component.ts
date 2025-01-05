import { Component } from '@angular/core';
import { ListProductComponent } from '../../components/list-product/list-product.component';
import { ProductsAdminService } from '../../services/products-admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-admin-home',
  imports: [ListProductComponent, CommonModule, FormsModule],
  providers: [ProductsAdminService],
  standalone: true,
  templateUrl: './products-admin-home.component.html',
  styleUrls: ['./products-admin-home.component.css']
})
export class ProductsAdminHomeComponent {

}
