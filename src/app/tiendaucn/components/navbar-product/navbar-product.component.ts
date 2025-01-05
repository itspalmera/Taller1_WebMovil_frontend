import { Component } from '@angular/core';
import { ButtonTemplateComponent } from "../button-template/button-template.component";
import { LogoComponent } from "../logo/logo.component";
import { DropdownButtonComponent } from "../dropdown-button/dropdown-button.component";

@Component({
  selector: 'navbar-product',
  imports: [ButtonTemplateComponent, LogoComponent, DropdownButtonComponent],
  templateUrl: './navbar-product.component.html',
  styleUrl: './navbar-product.component.css'
})
export class NavbarProductComponent {

}
