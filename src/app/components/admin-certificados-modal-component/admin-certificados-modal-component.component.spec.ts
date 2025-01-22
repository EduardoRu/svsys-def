import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminCertificadosModalComponentComponent } from './admin-certificados-modal-component.component';

describe('AdminCertificadosModalComponentComponent', () => {
  let component: AdminCertificadosModalComponentComponent;
  let fixture: ComponentFixture<AdminCertificadosModalComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCertificadosModalComponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCertificadosModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
