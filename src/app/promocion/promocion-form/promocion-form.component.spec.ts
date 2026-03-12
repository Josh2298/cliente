import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionFormComponent } from './promocion-form.component';

describe('PromocionFormComponent', () => {
  let component: PromocionFormComponent;
  let fixture: ComponentFixture<PromocionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromocionFormComponent]
    });
    fixture = TestBed.createComponent(PromocionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
