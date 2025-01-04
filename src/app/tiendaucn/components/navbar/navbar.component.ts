import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { NavbarButtonComponent } from "../navbar-button/navbar-button.component";

@Component({
  selector: 'navbar-basic', // Asegúrate de que este sea el selector correcto
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [LogoComponent, NavbarButtonComponent],
})
export class NavbarComponent {}
