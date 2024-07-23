import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlInformacionPage } from './control-informacion.page';

describe('ControlInformacionPage', () => {
  let component: ControlInformacionPage;
  let fixture: ComponentFixture<ControlInformacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlInformacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
