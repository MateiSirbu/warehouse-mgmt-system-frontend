import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCustomerOrderComponent } from './place-customer-order.component';

describe('PlaceCustomerOrderComponent', () => {
  let component: PlaceCustomerOrderComponent;
  let fixture: ComponentFixture<PlaceCustomerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceCustomerOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceCustomerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
