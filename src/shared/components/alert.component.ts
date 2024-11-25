import { AlertController } from '@ionic/angular';

export async function presentAlert(
  alertController: AlertController,
  title: string | undefined,
  text: string,
  img?: string,
  timeAlert?: string,
  AcceptFunction?: () => void,
  type?: string,
) {
  const existingAlert = await alertController.getTop();
  if (existingAlert) {
    await existingAlert.dismiss();
  }
  const imagePath = img ? `${window.location.origin}${img}` : '/assets/img/cerrado.svg';
  const timeAlertText = timeAlert ? `<b>${timeAlert}</b><br>` : '';

  const dynamicContent = `
    <img src="${imagePath}" alt="img cerrado">
    <h5 class="alertFont">${title || ''}</h5>
    <p class="alertSubtitle">${text}</p><br>
    ${timeAlertText}`;

  let alert: HTMLIonAlertElement;
  switch (type) {
    case "Logout":
      alert = await alertController.create({
        message: dynamicContent,
        backdropDismiss: true,
        cssClass: 'custom-alert', // Clase personalizada para mayor control
        buttons: [
          {
            text: 'ACEPTAR',
            role: 'accept',
            cssClass: 'alertButtonExchange',
            handler: () => {
              AcceptFunction?.();
              closeAlert(alert); // Pasar directamente la instancia
            },
          },
          {
            text: 'CANCELAR',
            role: 'cancel',
            cssClass: 'alertButtonExchange',
            handler: () => {
              closeAlert(alert);
            },
          },
        ],
      });
      break;
    default:
      alert = await alertController.create({
        message: dynamicContent,
        backdropDismiss: false,
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'ACEPTAR',
            role: 'cancel',
            cssClass: 'alertButton',
            handler: () => {
              AcceptFunction?.();
              closeAlert(alert);
            },
          },
        ],
      });
  }

  await alert.present();
}

async function closeAlert(alert: HTMLIonAlertElement) {
  if (alert) {
    await alert.dismiss(); // Cierra la alerta activa
  }
  const body = document.body;
  body.classList.remove('modal-open', 'overflow-hidden');
}