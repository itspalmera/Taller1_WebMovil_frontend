import { Component } from '@angular/core';
import { ButtonTemplateComponent } from "../button-template/button-template.component";

@Component({
  selector: 'login-form',
  imports: [ButtonTemplateComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

}
