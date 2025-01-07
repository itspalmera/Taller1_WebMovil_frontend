import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.css'],
})
export class DropdownButtonComponent {
  @Input() label: string = '';
  @Input() options: { label: string; route: string }[] = [];

  dropdownVisible: boolean = false;
  isDropdownOpen: boolean = false;
  isDoubleDropdownOpen: boolean = false;
  isInnerDropdownOpen: boolean = false; // Asegúrate de que esta propiedad esté definida

  constructor(private router: Router) {}

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
