import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoriaReportesPage } from './historia-reportes.page';

describe('HistoriaReportesPage', () => {
  let component: HistoriaReportesPage;
  let fixture: ComponentFixture<HistoriaReportesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
