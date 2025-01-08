import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { ButtonTemplateComponent } from "../button-template/button-template.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'navbar-basic', // Asegúrate de que este sea el selector correcto
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [LogoComponent, ButtonTemplateComponent,CommonModule],
})
export class NavbarComponent {
role: boolean  = false; // Asegúrate de que esta propiedad esté definida
  
  ngOnInit(): void {
    this.role = this.authService.isAdmin();
  }
  constructor(private authService: AuthService) { }
  
}
