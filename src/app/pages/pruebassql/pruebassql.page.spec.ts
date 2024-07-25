import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebassqlPage } from './pruebassql.page';

describe('PruebassqlPage', () => {
  let component: PruebassqlPage;
  let fixture: ComponentFixture<PruebassqlPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebassqlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
