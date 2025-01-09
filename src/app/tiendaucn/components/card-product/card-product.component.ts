import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../interfaces/GetAllProduct//Product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'card-product',
  imports: [HttpClientModule, CommonModule,FormsModule, ReactiveFormsModule],
  providers: [ShoppingCartService],
  standalone: true,
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css',
})
export class CardProductComponent {
  private shoppingCartService: ShoppingCartService = inject(ShoppingCartService);
  @Input() product!: Product;
  forms!: FormGroup;
  successMessage: string = '';
  error: boolean = false;
  errorMessage: string[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
      this.forms = this.formBuilder.group({
        quantity: [0, [Validators.required,Validators.min(0),Validators.max(99)]],
      });
    }
async onSubmit() {
    
    if (this.forms.invalid) return;

    try {
      console.log('Producto:', this.product.id);
      console.log('Cantidad:', this.forms.value.quantity);
      const response = await this.shoppingCartService.AddtoCart(+this.product.id, this.forms.value.quantity);
      console.log('Response:', response);
      if (response) {
        this.successMessage = "El producto se añadió correctamente al carrito.";
      }
      
      if (response) {
        this.error = false;
        this.errorMessage = [];
      }
    } catch (error: any) {
      console.error('Error en onSubmit', error.error.message);
      this.error = true;
      this.errorMessage.push(error.error.message);
    } finally {
      console.log('Petición Finalizada');
    }
  }


}
