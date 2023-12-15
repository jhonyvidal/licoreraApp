import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UserService } from 'src/store/services/user.service';

export class UsertAlerts {

  constructor(
    private router: Router,
    private userService: UserService,
    private requestUseCase: RequestUseCases,
  ){}

  public async presentAlertUser(
    alertController: AlertController,
    title: string | undefined,
    text: string,
    type: string,
    productImage?: string | undefined,
    tokenToDelete?: any,
    deletePaymentMethod?: (id: number) => void,
  ) {

    const iconObject: any = {
      logout: 'logoutAlert',
      areYouSure: 'areYouSure',
      congrats: 'checkGreen',
    }

    const warningImg = window.location.origin + `/assets/img/${iconObject[type]}.svg`;
    let imageAlert = type === 'exchange-products-success' ? productImage :  warningImg;
    let alert: any;

    const dynamicContent = `
      <img class="img-alert" src="${imageAlert}" alt="img cerrado">
      <h5 class="alertFont">${title}</h5>
      <p class="alertSubtitle">${text}</p> </br>`;

    switch (type) {
      case 'areYouSure':
        alert = await alertController.create({
          message: dynamicContent,
          backdropDismiss: false,
          buttons: [
            {
              text: 'ACEPTAR',
              role: 'accept',
              cssClass: 'alertButtonExchange',
              handler: () => {
                deletePaymentMethod?.(tokenToDelete || 0);
                this.closeAlert(alertController);
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

      case 'congrats':
        alert = await alertController.create({
          message: dynamicContent,
          backdropDismiss: false,
          buttons: [
            {
              text: 'ACEPTAR',
              role: 'cancel',
              cssClass: 'alertButton',
              handler: () => {
                deletePaymentMethod?.(tokenToDelete || 0);
                // this.closeAlert(alertController);
                this.router.navigate(['/user']);
              },
            },
          ],
        });
        break;

      case 'logout':
        alert = await alertController.create({
          message: dynamicContent,
          backdropDismiss: false,
          buttons: [
            {
              text: 'ACEPTAR',
              role: 'accept',
              cssClass: 'alertButtonExchange',
              handler: () => {
                this.userService.logout();
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

