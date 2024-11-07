import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  public segment = "iCliente";

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  onSegementChanged(event:any){
    this.cd.detectChanges();
    this.segment = event.detail.value;
  }

}
