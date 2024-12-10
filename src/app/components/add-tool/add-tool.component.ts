import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';
import { AddToolService } from 'src/app/services/actividades/addTool/add-tool.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddToolComponent  implements OnInit {
  
  public nuevaPesa: FormGroup;
  selectedFile: File | null = null; // Archivo completo
  selectedFileName: string | null = null;
  public herramientas:any = []


  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private addCarService: AddCarService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private toolService: AddToolService
  ) { }

  ngOnInit() {
    this.nuevaPesa = this.fb.group({
      identificacion: ['', Validators.required],
      tipo_instrumento: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      no_serie: ['', Validators.required],
      capacidad: ['', Validators.required],
      clase_exactitud: ['', Validators.required],
      observaciones: ['', Validators.required],
      estado: ['Disponible', Validators.required]
    });
  }

  async presentToast(msg: string, position: 'top' | 'middle' | 'bottom', color: "danger" | "dark" | "light" | "success" | "warning") {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      color: color
    });

    await toast.present();
  }

  async cancel(){
    await this.modalController.dismiss();
  }

  async agregarPesa(){
    const loading = await this.loadingController.create({
      message: 'Agregando pesa...'
    });
    await loading.present();

    if(this.nuevaPesa.valid){
      try {
        this.toolService.addTool(this.nuevaPesa.value).then((e:any) => {
          loading.dismiss();
          this.presentToast('Pesa agregada exitosamente', 'bottom','success');
          this.modalController.dismiss();
          this.nuevaPesa.reset();
        })
      } catch (error) {
        this.presentToast('Error: ' + error.message, 'bottom', 'danger');
      }
    }else{
      this.presentToast('Favor de completar todos los campos', 'bottom', 'warning');
    }
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.removeDragOverStyle(event.target as HTMLElement);

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (this.isValidFileType(file)) {
        this.selectedFileName = file.name; // Guarda el nombre del archivo
        
      } else {
        alert('Solo se permiten archivos Excel (.xlsx, .xls)');
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.addDragOverStyle(event.target as HTMLElement);
  }

  onDragLeave(event: DragEvent) {
    this.removeDragOverStyle(event.target as HTMLElement);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.isValidFileType(file)) {
        this.selectedFileName = file.name;
        this.selectedFile = file; // Guarda el archivo en la variable
        console.log('Archivo guardado:', this.selectedFile);
      } else {
        alert('Solo se permiten archivos Excel (.xlsx, .xls)');
      }
    }
  }

  isValidFileType(file: File): boolean {
    const allowedExtensions = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    return allowedExtensions.includes(file.type);
  }

  addDragOverStyle(element: HTMLElement) {
    element.classList.add('drag-over');
  }

  removeDragOverStyle(element: HTMLElement) {
    element.classList.remove('drag-over');
  }

  agregarTodosLosDatos() {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }
  
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Asumimos que estamos procesando la primera hoja
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
  
      // Convertir la hoja en formato JSON
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // `sheetData` es un array de arrays (cada fila es un array de celdas)
      for (let i = 1; i < sheetData.length; i++) {
        const element:any = sheetData[i];

        this.nuevaPesa.get('identificacion').setValue(element[1])
        this.nuevaPesa.get('tipo_instrumento').setValue(element[2])
        this.nuevaPesa.get('marca').setValue(element[3])
        this.nuevaPesa.get('modelo').setValue(element[4])
        this.nuevaPesa.get('no_serie').setValue(element[5])
        this.nuevaPesa.get('capacidad').setValue(element[6])
        this.nuevaPesa.get('clase_exactitud').setValue(element[7])
        this.nuevaPesa.get('observaciones').setValue(element[8])
        this.nuevaPesa.get('estado').setValue('Disponible')

        console.log(this.nuevaPesa.value);

        setTimeout(() => {
          try {
            this.toolService.addTool(this.nuevaPesa.value).then((e:any) => {
              this.presentToast('Pesa agregada exitosamente', 'bottom','success');
              this.modalController.dismiss();
              this.nuevaPesa.reset();
            })
          } catch (error) {
            this.presentToast('Error: ' + error.message, 'bottom', 'danger');
          }
        }, 1000);
      }
      
    };
  
    reader.onerror = (error) => {
      console.error('Error leyendo el archivo:', error);
    };
  
    reader.readAsArrayBuffer(this.selectedFile);
  }
}
