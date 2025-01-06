import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { ButtonTemplateComponent } from "../button-template/button-template.component";


@Component({
  selector: 'navbar-basic', // Asegúrate de que este sea el selector correcto
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [LogoComponent, ButtonTemplateComponent],
})
export class NavbarComponent {}
