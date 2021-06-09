import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustorderComponent } from './custorder.component';

describe('CustorderComponent', () => {
  let component: CustorderComponent;
  let fixture: ComponentFixture<CustorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
