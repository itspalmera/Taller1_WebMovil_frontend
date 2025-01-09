import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesAdminHomeComponent } from './purchases-admin-home.component';

describe('PurchasesAdminHomeComponent', () => {
  let component: PurchasesAdminHomeComponent;
  let fixture: ComponentFixture<PurchasesAdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesAdminHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
