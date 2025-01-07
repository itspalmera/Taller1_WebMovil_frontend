import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/GetAllProduct//Product';


@Component({
  selector: 'card-product',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css',
})
export class CardProductComponent {
  @Input() product!: Product;
}
