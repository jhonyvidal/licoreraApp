// import { Injector} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

export class UsertAlerts {

  constructor(
    private router: Router
  ){

  }

  public async presentAlertUser(
    alertController: AlertController,
    title: string | undefined,
    text: string,
    type: string,
    productImage?: string | undefined,
    // injector?: Injector | undefined,
    id?:number
  ) {

    const warningImg = window.location.origin + `/assets/img/${type === 'Logout' ? 'logoutAlert' : type === 'exchange-products-success-response' ? 'checkGreen' : ''}.svg`;
    // const timeAlertText = timeAlert ? '<b>${timeAlert}</b></br>' : '';
    let imageAlert = type === 'exchange-products-success' ? productImage :  warningImg;
    let alert: any;

    const dynamicContent = `
      <img class="img-alert" src="${imageAlert}" alt="img cerrado">
      <h5 class="alertFont">${title}</h5>
      <p class="alertSubtitle">${text}</p> </br>`;

    switch (type) {
      case 'exchange-products-bad':
        alert = await alertController.create({
          message: dynamicContent,
          backdropDismiss: false,
          buttons: [
            {
              text: 'ACEPTAR',
              role: 'cancel',
              cssClass: 'alertButton',
              handler: () => {
                this.closeAlert(alertController);
              },
            },
          ],
        });
        break;

      case 'exchange-products-success-response':
        alert = await alertController.create({
          message: dynamicContent,
          backdropDismiss: false,
          buttons: [
            {
              text: 'ACEPTAR',
              role: 'cancel',
              cssClass: 'alertButton',
              handler: () => {
                this.closeAlert(alertController);
              },
            },
          ],
        });
        break;

      case 'Logout':
        alert = await alertController.create({
          message: dynamicContent,
          backdropDismiss: false,
          buttons: [
            {
              text: 'ACEPTAR',
              role: 'accept',
              cssClass: 'alertButtonExchange',
              handler: () => {
                this.router.navigate(['/home']);
              },
            },
            {
              text: 'CANCELAR',
              role: 'cancel',
              cssClass: 'alertButtonExchange',
              handler: () => {
                this.closeAlert(alertController);
              },
            }
          ],
        });
        break;

      default:
        break;
    }


    await alert.present();
  }

  async closeAlert(alert: any) {
    const modal = await alert.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

}

