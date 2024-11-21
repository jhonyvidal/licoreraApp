import { AlertController } from '@ionic/angular';

export async function presentAlert(
  alertController: AlertController,
  title: string | undefined,
  text: string,
  img?: string,
  timeAlert?: string,
  AcceptFuntion?:  () => void,
  type?: string,
) {
  const imagePath = window.location.origin + img ? img : '/assets/img/cerrado.svg';
  const timeAlertText = timeAlert ? '<b>${timeAlert}</b></br>' : '';

  const dynamicContent = `
    <img src="${imagePath}" alt="img cerrado">
    <h5 class="alertFont">${title}</h5>
    <p class="alertSubtitle">${text}</p> </br>
    ${timeAlertText}`;

    let alert:any;
    switch (type) {
      case "Logout":
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
                  closeAlert(alertController);
                  AcceptFuntion();
                }else{
                  closeAlert(alertController);
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
        alert = await alertController.create({
          message: dynamicContent,
          backdropDismiss: false,
          buttons: [
            {
              text: 'ACEPTAR',
              role: 'cancel',
              cssClass: 'alertButton',
              handler: () => {
                if (AcceptFuntion) {
                  closeAlert(alertController);
                  AcceptFuntion();
                }else{
                  closeAlert(alertController);
                }
              },
            },
          ],
        });
    }
  await alert.present();
}

async function closeAlert(alert: any) {
  const modal = await alert.getTop();
  if (modal) {
    modal.dismiss();
  }
}
