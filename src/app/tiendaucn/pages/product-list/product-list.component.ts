import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { LogoComponent } from '../../components/logo/logo.component';
import { DropdownButtonComponent } from "../../components/dropdown-button/dropdown-button.component";
import { NavbarProductComponent } from "../../components/navbar-product/navbar-product.component";
import { CardProductComponent } from "../../components/card-product/card-product.component";

@Component({
  selector: 'app-product-list',
  imports: [NavbarProductComponent, CardProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
