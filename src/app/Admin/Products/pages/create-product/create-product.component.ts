import { Component } from '@angular/core';
import { ProductsAdminService } from '../../services/products-admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCreateProductComponent } from '../../components/form-create-product/form-create-product.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-create-product',
  imports: [FormCreateProductComponent,CommonModule,FormsModule, ReactiveFormsModule],
  providers: [ProductsAdminService],
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

}
