import { Component } from '@angular/core';
import { ButtonTemplateComponent } from "../button-template/button-template.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'edit-profile-form',
  imports: [
    ButtonTemplateComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit-profile-form.component.html',
  styleUrl: './edit-profile-form.component.css',
})
export class EditProfileFormComponent {
  editProfileForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: [
        '',
        [Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)],
      ],
      genderId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const userProfile = await this.userService.getUserProfile(); // Método para obtener datos del usuario
      this.editProfileForm.patchValue({
        name: userProfile.name,
        birthDate: userProfile.birthDate,
        genderId: userProfile.genderId,
      });
    } catch (error) {
      this.errorMessage =
        'Error al cargar el perfil. Por favor, intenta nuevamente.';
      console.error('Error al cargar perfil:', error);
    }
  }

  async onSubmit() {
    if (this.editProfileForm.valid) {
      const updatedData = this.editProfileForm.value;

      try {
        const success = await this.userService.updateProfile(updatedData); // Método para actualizar perfil
        if (success) {
          this.successMessage = 'Perfil actualizado exitosamente.';
          setTimeout(() => this.router.navigate(['/dashboard']), 2000);
        }
      } catch (error) {
        this.errorMessage =
          'Error al actualizar el perfil. Por favor, intenta nuevamente.';
        console.error('Error al actualizar perfil:', error);
      }
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }
}
