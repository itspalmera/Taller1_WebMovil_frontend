import { Component, inject, OnInit } from '@angular/core';
import { ResponseAPIGetOnlyProduct } from '../../Interfaces/ResponseAPI_GetProduct';
import { ProductsAdminService } from '../../services/products-admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../Interfaces/Product';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule,HttpClientModule,FormsModule, ReactiveFormsModule],
  providers: [ProductsAdminService],
  standalone: true,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  public categories: any[5] = [];
  public productId: string  = '';
  public product: ResponseAPIGetOnlyProduct | null = null;
  selectedCategory: number = 0;
  forms!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  successMessage: string = '';

  constructor(private router: Router,private productsAdminService: ProductsAdminService,private route: ActivatedRoute,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '1'  // Obtiene el id de la ruta
    this.getProduct(this.productId);
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
  getProduct(productId: string) {
    this.productsAdminService.getProduct(productId)
      .then(response => {

      // Verifica si la respuesta es un arreglo y tiene al menos un producto
      if (response) {
        const product = response; // Accedemos al primer producto
        // Usamos patchValue para actualizar los valores del formulario
        this.forms.patchValue({
          name: product.name,           // Asignamos el nombre
          price: product.price,
          stock:product.stock,         // Asignamos el precio (deberías revisar si 'email' es correcto)
          image: product.image,                // Asigna la fecha de nacimiento si la tienes
          categoryId: product.categoryId                  // Asigna el género si lo tienes
        });
      }
      }).catch(error => {
        console.error('Error al obtener el producto:',error);
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
      console.log(this.selectedCategory+1);
      console.log(this.forms.value.categoryId);
      const product: Product = {
        name: this.forms.value.name,
        price: this.forms.value.price,
        stock: this.forms.value.stock,
        image: this.forms.value.image,
        categoryId: this.forms.value.categoryId,
      };

      const response = await this.productsAdminService.updateProduct(product, this.productId);
      if (response) {
        this.successMessage = "El producto se actualizó correctamente.";  // Establecer el mensaje de éxito
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
      this.getProduct(this.productId);
    } finally {
      console.log('Petición Finalizada');
      this.getProduct(this.productId);
    }
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


