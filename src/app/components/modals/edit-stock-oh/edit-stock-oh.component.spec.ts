import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockOHComponent } from './edit-stock-oh.component';

describe('EditStockOHComponent', () => {
  let component: EditStockOHComponent;
  let fixture: ComponentFixture<EditStockOHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStockOHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStockOHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
