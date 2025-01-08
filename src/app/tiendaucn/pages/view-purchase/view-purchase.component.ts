import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ListPurchaseComponent } from '../../components/list-purchase/list-purchase.component';

@Component({
  selector: 'app-view-purchase',
  imports: [ListPurchaseComponent,NavbarComponent],
  templateUrl: './view-purchase.component.html',
  styleUrl: './view-purchase.component.css'
})
export class ViewPurchaseComponent {

}
