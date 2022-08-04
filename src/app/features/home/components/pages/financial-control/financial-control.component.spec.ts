import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialControlComponent } from './financial-control.component';

describe('FinancialControlComponent', () => {
  let component: FinancialControlComponent;
  let fixture: ComponentFixture<FinancialControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
