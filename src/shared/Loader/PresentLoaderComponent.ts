import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})

export class PresentLoaderComponent {

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

}