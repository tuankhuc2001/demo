import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCustomerComponent } from './modal-add-customer.component';

describe('ModalAddCustomerComponent', () => {
  let component: ModalAddCustomerComponent;
  let fixture: ComponentFixture<ModalAddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
