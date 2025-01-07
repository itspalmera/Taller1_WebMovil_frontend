import { Component } from '@angular/core';
import { EditPasswordFormComponent } from "../../components/edit-password-form/edit-password-form.component";
import { NavbarProductComponent } from "../../components/navbar-product/navbar-product.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'change-password',
  imports: [EditPasswordFormComponent, NavbarProductComponent, HttpClientModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {}
