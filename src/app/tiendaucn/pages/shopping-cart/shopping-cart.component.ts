import { Component } from '@angular/core';
import { NavbarProductComponent } from "../../components/navbar-product/navbar-product.component";
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-shopping-cart',
  imports: [NavbarComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

}
