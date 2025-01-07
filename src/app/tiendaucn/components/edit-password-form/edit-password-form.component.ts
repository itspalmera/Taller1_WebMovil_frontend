import { Component } from '@angular/core';
import { ButtonTemplateComponent } from "../button-template/button-template.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'edit-password-form',
  imports: [
    ButtonTemplateComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit-password-form.component.html',
  styleUrl: './edit-password-form.component.css',
})
export class EditPasswordFormComponent {}
