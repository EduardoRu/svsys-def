import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiEquiPage } from './vehi-equi.page';

describe('VehiEquiPage', () => {
  let component: VehiEquiPage;
  let fixture: ComponentFixture<VehiEquiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiEquiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
