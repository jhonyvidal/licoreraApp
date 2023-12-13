import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private storage: Storage) {
    this.initStorage(); // Inicializar Ionic Storage
  }

  private async initStorage() {
    await this.storage.create();
  }

  // Método para realizar el inicio de sesión
  login(userData: UserModel, refresh_token?:string): boolean {
    userData.refresh_token = refresh_token ? refresh_token : '';
    // Almacenar los datos del usuario en el almacenamiento local
    this.storage.set('userData', userData);

    return true; // Indicar que el inicio de sesión fue exitoso
  }

  async refreshToken(token: string, refresh_token:string): Promise<boolean> {

    const data = await this.storage.get('userData')
    const newData = {
      ...data,
      token,
      refresh_token
    };
    // Almacenar los datos del usuario en el almacenamiento local
    this.storage.set('userData', newData);

    return true; // Indicar que el inicio de sesión fue exitoso
  }

  // Método para obtener los datos del usuario almacenados en el almacenamiento
  async getUserData(): Promise<UserModel> {
    return await this.storage.get('userData');
  }

  // Método para cerrar sesión
  async logout() {
    await this.storage.remove('userData');
  }
}
