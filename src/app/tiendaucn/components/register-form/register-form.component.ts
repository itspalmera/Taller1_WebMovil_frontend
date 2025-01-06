import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { user } from '../../interfaces/Users/user';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonTemplateComponent } from '../button-template/button-template.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";



@Component({
  selector: 'register-form',
  imports: [
    ButtonTemplateComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Definición del formulario reactivo
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [
        '',
        [Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      genderId: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Construir el objeto usuario basado en la interfaz
      const userData: user = {
        rut: '', // Si es necesario, agrega este campo o elimínalo de la interfaz
        name: formData.name,
        birthDate: formData.birthDate,
        email: formData.email,
        genderId: formData.genderId,
        password: formData.password,
        confirmPassword: formData.password, // No se captura confirmación, usamos el mismo valor
      };

      try {
        const success = await this.userService.register(userData);
        if (success) {
          this.successMessage = 'Registro exitoso. Redirigiendo...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        }
      } catch (error) {
        this.errorMessage =
          'Error al registrar. Por favor, verifica los datos.';
        console.error('Error en el registro:', error);
      }
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }
}
