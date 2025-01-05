import { Component } from '@angular/core';
import { ButtonTemplateComponent } from "../button-template/button-template.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'edit-profile-form',
  imports: [ButtonTemplateComponent, HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,],
  templateUrl: './edit-profile-form.component.html',
  styleUrl: './edit-profile-form.component.css'
})
export class EditProfileFormComponent {

}
