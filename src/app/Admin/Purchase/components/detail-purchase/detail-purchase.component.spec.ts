import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPurchaseComponent } from './detail-purchase.component';

describe('DetailPurchaseComponent', () => {
  let component: DetailPurchaseComponent;
  let fixture: ComponentFixture<DetailPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
