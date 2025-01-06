import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { LogoComponent } from '../../components/logo/logo.component';
import { DropdownButtonComponent } from "../../components/dropdown-button/dropdown-button.component";
import { NavbarProductComponent } from "../../components/navbar-product/navbar-product.component";
import { CardProductComponent } from "../../components/card-product/card-product.component";
import { CardListComponent } from "../../components/card-list/card-list.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  imports: [CardProductComponent, CardListComponent, CommonModule, HttpClientModule, NavbarProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
