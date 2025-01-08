import { Component, Input } from '@angular/core';
import { ButtonTemplateComponent } from "../button-template/button-template.component";
import { LogoComponent } from "../logo/logo.component";
import { DropdownButtonComponent } from "../dropdown-button/dropdown-button.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar-product',
  imports: [
    ButtonTemplateComponent,
    LogoComponent,
    DropdownButtonComponent,
    SearchBarComponent,
    CommonModule
  ],
  templateUrl: './navbar-product.component.html',
  styleUrl: './navbar-product.component.css',
})
export class NavbarProductComponent {
  @Input() options: { label: string; route: string }[] = [];

  dropdownVisible: boolean = false;
  isDropdownOpen: boolean = false;
  isDoubleDropdownOpen: boolean = false;
  isInnerDropdownOpen: boolean = false; // Asegúrate de que esta propiedad esté definida
  role: boolean  = false; // Asegúrate de que esta propiedad esté definida
  
  ngOnInit(): void {
    this.role = this.authService.isAdmin();
  }
  constructor(private authService: AuthService) { }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDoubleDropdown() {
    this.isDoubleDropdownOpen = !this.isDoubleDropdownOpen;
  }

  toggleInnerDropdown() {
    this.isInnerDropdownOpen = !this.isInnerDropdownOpen;
  }
}
