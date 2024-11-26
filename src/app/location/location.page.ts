import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import proj4 from 'proj4';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.obtenerUbicacion()
  }

  async obtenerUbicacion() {
    try {
      // Definir el sistema de referencia UTM (Ejemplo: WGS84 zona 13N)
      const utmZone13N = "+proj=utm +zone=13 +datum=WGS84 +units=m +no_defs";
  
      // Función para convertir latitud/longitud a UTM con redondeo
      const latLongToUtm = (lat: number, long: number) => {
        const utmCoords = proj4(proj4.WGS84, utmZone13N, [long, lat]);
        return {
          easting: Math.round(utmCoords[0]), // Coordenada Este redondeada
          northing: Math.round(utmCoords[1]), // Coordenada Norte redondeada
        };
      };
  
      // Obtener la ubicación actual
      const position = await Geolocation.getCurrentPosition();
  
      console.log("Latitud y Longitud actuales:", {
        latitud: position.coords.latitude,
        longitud: position.coords.longitude,
      });
  
      // Convertir latitud y longitud a UTM con redondeo
      const utmCoords = latLongToUtm(position.coords.latitude, position.coords.longitude);
  
      console.log("Coordenadas UTM (redondeadas):", utmCoords);
  
      // Retornar los datos en caso de que necesites usarlos más adelante
      return {
        latitud: position.coords.latitude,
        longitud: position.coords.longitude,
        utm: utmCoords,
      };
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      throw error; // Lanza el error para manejarlo donde se llame esta función
    }
  }



}
