import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-button',
  imports: [],
  templateUrl: './navbar-button.component.html',
  styleUrl: './navbar-button.component.css',
})
export class NavbarButtonComponent {
  @Input() label: string = '';
  @Input() route: string = '';

  constructor(private router: Router) {}

  navigateToPage() {
    this.router.navigate([this.route]);
  }
}
