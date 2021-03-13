import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OobeComponent } from './oobe.component';

describe('OobeComponent', () => {
  let component: OobeComponent;
  let fixture: ComponentFixture<OobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
