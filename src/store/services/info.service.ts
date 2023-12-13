import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { InfoModel } from '../models/info-model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  constructor(private storage: Storage) {
    this.initStorage(); // Inicializar Ionic Storage
  }

  private async initStorage() {
    await this.storage.create();
  }

  // Método para realizar el inicio de sesión
  async setInfoData(Data: InfoModel) {
    // Almacenar los datos del usuario en el almacenamiento local
    // this.storage.set('InfoModel', Data);
    // return true; // Indicar que el inicio de sesión fue exitoso
    let infoData;
    this.storage.get('InfoModel')
    .then(data => {
      infoData = data;
      if(data === null){
        infoData = Data
      }else{
        infoData = {...infoData,...Data};
      }
      this.storage.set('InfoModel', infoData);
    })
    .catch(error => {
      console.error('Error al obtener los datos del infoData:', error);
    });
    return true; // Indicar que el inicio de sesión fue exitoso
  }

  async setHeightData(height: number) {
    // Almacenar los datos del usuario en el almacenamiento local
    let infoData;
    this.storage.get('InfoModel')
    .then(data => {
      if(data !== null){
        infoData = data;
      }else{
        infoData = {};
      }
      infoData.height = height;
      this.storage.set('InfoModel', infoData);
    })
    .catch(error => {
      console.error('Error al obtener los datos del infoData:', error);
    });
    return true; // Indicar que el inicio de sesión fue exitoso
  }

  async setIsWelcome(status: boolean) {
    // Almacenar los datos del usuario en el almacenamiento local
    let infoData;
    this.storage.get('InfoModel')
    .then(data => {
      if(data !== null){
        infoData = data;
      }else{
        infoData = {};
      }
      infoData.isWelcome = status;
      console.log(infoData);
      this.storage.set('InfoModel', infoData);
    })
    .catch(error => {
      console.error('Error al obtener los datos del infoData:', error);
    });
    return true; // Indicar que el inicio de sesión fue exitoso
  }

  // Método para obtener los datos del usuario almacenados en el almacenamiento
  async getInfoData(): Promise<InfoModel> {
    return await this.storage.get('InfoModel');
  }

  // Método para cerrar sesión
  async deleteInfoData() {
    await this.storage.remove('InfoModel');
  }
}
