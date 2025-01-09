import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { user } from '../../interfaces/Users/user';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonTemplateComponent } from '../button-template/button-template.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../services/auth.service';



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
  forms!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  genders: string[] = [];
  successMessage: string = '';

  constructor(private router: Router,private authService: AuthService,private route: ActivatedRoute,private formBuilder: FormBuilder) { 
    this.genders[0] = 'female';
    this.genders[1] = 'male';
    this.genders[2] = 'other';
    this.genders[3] = 'prefer-not-to-say';
  }
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forms = this.formBuilder.group({
      rut: ['', [Validators.required,]],
      name: ['', [Validators.required,Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"),Validators.min(8),Validators.max(255)]],
      email: ['', [Validators.required,Validators.email]],
      birthDate: ['', [Validators.required,]],
      genderId: ['', [Validators.required,]],
      password: ['', [Validators.required,Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$"),Validators.min(8),Validators.max(20)]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  async onSubmit() {
      if (this.forms.invalid) return;
      for (let i: number = 0; i < this.genders.length; i++) {
        if (this.genders[i] === this.forms.value.genderId) {
          this.forms.value.genderId = i + 1;
        }
      }
      const formattedBirthdate = this.formatDate(this.forms.value.birthDate);
      
      
      try {
        const user: user = {
          rut: this.forms.value.rut,
          name: this.forms.value.name,
          birthDate: formattedBirthdate,
          email: this.forms.value.email,
          genderId: this.forms.value.genderId.toString(),
          password: this.forms.value.password,
          confirmPassword: this.forms.value.confirmPassword,
        };
        console.log(user);
        
  
        const response = await this.authService.register(user);
        if (response) {
          this.successMessage = "El usuario se registró correctamente.";
        }
        
        if (response) {
          this.error = false;
          this.errorMessage = [];
          console.log(this.successMessage);
          this.router.navigate(['/login']);
        }
      } catch (error: any) {
        console.error('Error en onSubmit', error.error.message);
        this.error = true;
        this.errorMessage.push(error.error.message);
      } finally {
        console.log('Petición Finalizada');
      }
    }
    formatDate(date: string): string {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    }
    get rutRequired(){
      return this.forms.get('rut')?.hasError('required') && this.forms.get('rut')?.touched;
    }
    get nameRequired() {
      return this.forms.get('name')?.hasError('required') && this.forms.get('name')?.touched;
    }
  
    get nameShort() {
      return this.forms.get('name')?.hasError('minlength') && this.forms.get('name')?.touched;
    }
  
    get nameLong() {
      return this.forms.get('name')?.hasError('maxlength') && this.forms.get('name')?.touched;
    }
  
    get nameFormatInvalid() {
    return this.forms.get('name')?.hasError('pattern') && this.forms.get('name')?.touched;
    }
    get birthDateRequired(){
      return this.forms.get('birthDate')?.hasError('required') && this.forms.get('birthDate')?.touched;
    }

    get emailRequired() {
      return this.forms.get('email')?.hasError('required') && this.forms.get('email')?.touched;
    }
    get emailFormatInvalid() {
      return this.forms.get('email')?.hasError('email') && this.forms.get('email')?.touched;
    }
    get genderRequired(){
      return this.forms.get('genderId')?.hasError('required') && this.forms.get('genderId')?.touched;
    }
    get passwordRequired(){
      return this.forms.get('password')?.hasError('required') && this.forms.get('password')?.touched;
    }
    get passwordFormatInvalid() {
    return this.forms.get('password')?.hasError('pattern') && this.forms.get('password')?.touched;
    }
    get passwordShort() {
      return this.forms.get('password')?.hasError('minlength') && this.forms.get('password')?.touched;
    }
    
    get passwordLong() {
      return this.forms.get('password')?.hasError('maxlength') && this.forms.get('password')?.touched;
    }
    get confirmPasswordRequired(){
      return this.forms.get('confirmPassword')?.hasError('required') && this.forms.get('confirmPassword')?.touched;
    }
}
