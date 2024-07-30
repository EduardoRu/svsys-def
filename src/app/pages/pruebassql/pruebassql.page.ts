import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SqliteService } from 'src/app/services/sqlite/sqlite.service';

@Component({
  selector: 'app-pruebassql',
  templateUrl: './pruebassql.page.html',
  styleUrls: ['./pruebassql.page.scss'],
})
export class PruebassqlPage implements OnInit {

  items:any[] = [];

  constructor(
    private storageService: StorageService,
    private sqliteService: SqliteService
  ) { }

  async ngOnInit() {
  }

  async pruebaRegistro(){
    const key = 'pruebassql2';
    const value = {
      'pruebassql': 'pr',
      'pruebass': 'pr'
    };

    await this.storageService.addValue(key, value).then((res) => {
      console.log(res);
    });
  }

  async pruebaConsulta(){
    const key = 'pruebassql';
    const value = await this.storageService.getValue(key);
    console.log('Item recuperado:', value);
  }

}
