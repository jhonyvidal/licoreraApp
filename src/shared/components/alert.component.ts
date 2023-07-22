import { AlertController } from '@ionic/angular';

export async function presentAlert(
  alertController: AlertController,
  title: string | undefined,
  text: string,
  // type?: string,
  timeAlert?: string
) {
  const imagePath = window.location.origin + '/assets/img/cerrado.svg';
  // const imagePathEP = window.location.origin + '/assets/img/warning.svg';
  const timeAlertText = timeAlert ? '<b>${timeAlert}</b></br>' : '';
  // let imageAlert = type === 'exchange-products-bad' ? imagePathEP : imagePath;

  const dynamicContent = `
    <img src="${imagePath}" alt="img cerrado">
    <h5 class="alertFont">${title}</h5>
    <p class="alertSubtitle">${text}</p> </br>
    ${timeAlertText}`;

  const alert = await alertController.create({
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
  await alert.present();
}

async function closeAlert(alert: any) {
  const modal = await alert.getTop();
  if (modal) {
    modal.dismiss();
  }
}
