import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCOFilledQtyComponent } from './edit-cofilled-qty.component';

describe('EditCOFilledQtyComponent', () => {
  let component: EditCOFilledQtyComponent;
  let fixture: ComponentFixture<EditCOFilledQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCOFilledQtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCOFilledQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
