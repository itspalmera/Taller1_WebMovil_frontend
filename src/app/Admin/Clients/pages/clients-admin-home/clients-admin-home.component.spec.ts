import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAdminHomeComponent } from './clients-admin-home.component';

describe('ClientsAdminHomeComponent', () => {
  let component: ClientsAdminHomeComponent;
  let fixture: ComponentFixture<ClientsAdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsAdminHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
