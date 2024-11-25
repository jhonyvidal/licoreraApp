import { AlertController } from '@ionic/angular';

export async function presentAlertExchange(
  alertController: AlertController,
  title: string | undefined,
  text: string,
  type: string,
  productImage?: string | undefined,
  AcceptFuntion?: (id: number | null) => void,
  AcceptFuntionWithoutParams?: () => void,
  id?:number
) {
  const warningImg = window.location.origin + `/assets/img/${type === 'exchange-products-bad' ? 'warning' : type === 'exchange-products-success-response' ? 'checkGreen' : ''}.svg`;
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
              closeAlert(alertController);
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
              closeAlert(alertController);
            },
          },
        ],
      });
      break;

    case 'exchange-products-success':
      alert = await alertController.create({
        message: dynamicContent,
        backdropDismiss: false,
        buttons: [
          {
            text: 'ACEPTAR',
            role: 'accept',
            cssClass: 'alertButtonExchange',
            handler: () => {
              if (AcceptFuntion) {
                AcceptFuntion(id || 0); // Puedes pasar cualquier ID que necesites aquí
              }
            },
          },
          {
            text: 'CANCELAR',
            role: 'cancel',
            cssClass: 'alertButtonExchange',
            handler: () => {
              closeAlert(alertController);
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

async function closeAlert(alert: any) {
  const modal = await alert.getTop();
  if (modal) {
    modal.dismiss();
  }
  const body = document.body;
  body.classList.remove('modal-open', 'overflow-hidden');
}
