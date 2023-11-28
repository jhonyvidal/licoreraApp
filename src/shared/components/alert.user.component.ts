// import { Injector} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UserService } from 'src/store/services/user.service';
import { DataArray } from '../domain/response/PaymentMethodsGetResponse';
import { DeletePaymentMethodsRequest } from '../domain/request/DeletePaymentRequest';

export class UsertAlerts {

  // private paymentMethodsList: DataArray[];

  constructor(
    private router: Router,
    private userService: UserService,
    private requestUseCase: RequestUseCases,
    // paymentMethodsList: DataArray[]
  ){
    // paymentMethodsList = this.paymentMethodsList;
  }

  public async presentAlertUser(
    alertController: AlertController,
    title: string | undefined,
    text: string,
    type: string,
    productImage?: string | undefined,
    idToDelete?: number | undefined,
    deletePaymentMethod?: (id: number) => void,
    // injector?: Injector | undefined,
  ) {

    const iconObject: any = {
      logout: 'logoutAlert',
      areYouSure: 'areYouSure',
      congrats: 'checkGreen',
    }

    // const warningImg = window.location.origin + `/assets/img/${type === 'Logout' ? 'logoutAlert' : type === 'exchange-products-success-response' ? 'checkGreen' : ''}.svg`;
    const warningImg = window.location.origin + `/assets/img/${iconObject[type]}.svg`;
    // const timeAlertText = timeAlert ? '<b>${timeAlert}</b></br>' : '';
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
                deletePaymentMethod?.(idToDelete || 0);
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
                deletePaymentMethod?.(idToDelete || 0);
                this.closeAlert(alertController);
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

