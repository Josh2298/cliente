import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiaFormComponent } from './membresia-form.component';

describe('MembresiaFormComponent', () => {
  let component: MembresiaFormComponent;
  let fixture: ComponentFixture<MembresiaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembresiaFormComponent]
    });
    fixture = TestBed.createComponent(MembresiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
