import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})

export class PresentLoaderComponent {
    private loadingHandle: HTMLIonLoadingElement;
    constructor(
        private loadingCtrl: LoadingController
    ){}

    async showLoading() {
        const loading = await this.loadingCtrl.create({
            // message: 'Dismissing after 3 seconds...',
            duration: 3000,
        });

        loading.present();
    }

    async showHandleLoading() {
        this.loadingHandle = await this.loadingCtrl.create({
          duration: null || 10000, // Duración nula para que el cargador no se cierre automáticamente
        });
    
        await this.loadingHandle.present();
      }
    
      async hideHandleLoading() {
        if (this.loadingHandle) {
          await this.loadingHandle.dismiss();
        }
      }

}