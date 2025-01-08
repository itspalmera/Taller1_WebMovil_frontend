import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { ButtonTemplateComponent } from "../button-template/button-template.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'navbar-basic', // Asegúrate de que este sea el selector correcto
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [HttpClientModule,LogoComponent, ButtonTemplateComponent,CommonModule],
})
export class NavbarComponent {
isAdmin: boolean  = false; // Asegúrate de que esta propiedad esté definida
isUser: boolean = false;
  
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
  }
  constructor(private authService: AuthService) { }
  
  logout() {
    this.authService.deleteCookie("auth_token");
    console.log( "eliminada");
    // Después de eliminar la cookie, se puede actualizar el estado
    this.isUser = false; // Asegúrate de que esta propiedad esté definida
  }
}
