import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsAdminService } from '../../services/products-admin.service';
import { ResponseAPIGetOnlyProduct } from '../../Interfaces/ResponseAPI_GetProduct';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../Interfaces/Product';

@Component({
  selector: 'app-form-create-product',
  imports: [HttpClientModule, CommonModule,FormsModule, ReactiveFormsModule],
  providers: [ProductsAdminService],
  standalone: true,
  templateUrl: './form-create-product.component.html',
  styleUrl: './form-create-product.component.css'
})
export class FormCreateProductComponent implements OnInit {
  public categories: any[5] = [];
  selectedCategory: number = 0;
  forms!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  successMessage: string = '';

  constructor(private router: Router,private productsAdminService: ProductsAdminService,private route: ActivatedRoute,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCategories();
    this.createForm();
  }
  createForm() {
    this.forms = this.formBuilder.group({
      name: ['', [Validators.required,]],
      price: ['', [Validators.required,Validators.pattern(/^\d+$/),Validators.min(1) ]],
      stock: ['', [Validators.required,Validators.pattern(/^\d+$/),Validators.min(0) ]],
      image: ['', [Validators.required,]],
      categoryId: ['', [Validators.required,Validators.min(1),Validators.max(5)]],
    });
  }

  getCategories() {
    this.productsAdminService.getCategory()
      .then(response => {
        this.categories = response;
      })
      .catch(error => {
        console.error('Error al obtener los tipos:', error);
      });
  }

  async onSubmit() {
    
    if (this.forms.invalid) return;

    try {
      const product: Product = {
        name: this.forms.value.name,
        price: this.forms.value.price,
        stock: this.forms.value.stock,
        image: this.forms.value.image,
        categoryId: this.forms.value.categoryId,
      };

      const response = await this.productsAdminService.createProduct(product);
      if (response) {
        this.successMessage = "El producto se creo correctamente.";
      }
      
      if (response) {
        this.error = false;
        this.errorMessage = [];
        console.log('producto actualizado:', response);
      }
      this.getCategories();
    } catch (error: any) {
      console.error('Error en onSubmit', error.error.message);
      this.error = true;
      this.errorMessage.push(error.error.message);
    } finally {
      console.log('Petición Finalizada');
    }
  }
  //Validation name

  get nameRequired() {
    return this.forms.get('name')?.hasError('required') && this.forms.get('name')?.touched;
  }
  //Validation name

  get priceRequired() {
    return this.forms.get('price')?.hasError('required') && this.forms.get('price')?.touched;
  }
  //Validation name

  get stockRequired() {
    return this.forms.get('stock')?.hasError('required') && this.forms.get('stock')?.touched;
  }
  //Validation Category
  get categoryRequired() {
    return this.forms.get('categoryId')?.hasError('required') && this.forms.get('categoryId')?.touched;
  }
  
  get categoryOutOfRange() {
    return (
      (this.forms.get('categoryId')?.hasError('min') || this.forms.get('categoryId')?.hasError('max')) &&
      this.forms.get('categoryId')?.touched
    );
  }
}
