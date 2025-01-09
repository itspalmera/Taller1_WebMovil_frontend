import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAdminHomeComponent } from './products-admin-home.component';

describe('ProductsAdminHomeComponent', () => {
  let component: ProductsAdminHomeComponent;
  let fixture: ComponentFixture<ProductsAdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAdminHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
