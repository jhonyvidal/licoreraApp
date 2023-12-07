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
  async setInfoData(infoData: InfoModel) {
    // Almacenar los datos del usuario en el almacenamiento local
    this.storage.set('InfoModel', infoData);
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
