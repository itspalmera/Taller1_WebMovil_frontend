import { Component } from '@angular/core';
import { EditProfileFormComponent } from "../../components/edit-profile-form/edit-profile-form.component";
import { NavbarProductComponent } from "../../components/navbar-product/navbar-product.component";

@Component({
  selector: 'edit-profile',
  imports: [EditProfileFormComponent, NavbarProductComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

}
