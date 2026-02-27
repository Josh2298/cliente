import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaLogComponent } from './caja-log.component';

describe('CajaLogComponent', () => {
  let component: CajaLogComponent;
  let fixture: ComponentFixture<CajaLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CajaLogComponent]
    });
    fixture = TestBed.createComponent(CajaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
