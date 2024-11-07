import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerarReporteCeluComponent } from './generar-reporte-celu.component';

describe('GenerarReporteCeluComponent', () => {
  let component: GenerarReporteCeluComponent;
  let fixture: ComponentFixture<GenerarReporteCeluComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarReporteCeluComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerarReporteCeluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
