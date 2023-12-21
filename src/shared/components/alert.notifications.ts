// Importa el componente StarRating
import { AlertController } from '@ionic/angular';
import { StarRatingComponent } from './StarRatingComponent';

export async function AlertNotifications(
  alertController: AlertController,
  title: string | undefined,
  text: string,
  img?: string,
  timeAlert?: string,
  AcceptFuntion?: () => void,
  type?: string,
) {
  const imagePath = window.location.origin + (img ? img : '/assets/img/cerrado.svg');
  const timeAlertText = timeAlert ? `<b>${timeAlert}</b></br>` : '';
  let startRating = type === 'Qualification' ? '<div id="starRating"></div>': ''
  const SumitText = type === 'Qualification' ? 'CALIFICAR' : 'ACEPTAR'
  const notificationClass = type === 'Qualification' ? 'imgQualify' :'imgNotifications'

  const dynamicContent = `
    <div><img src="${imagePath}" class="${notificationClass}" alt="img cerrado"></div>
    <h5 class="alertFontNotifications">${title}</h5>
    <p class="alertSubtitle">${text}</p></br>
    ${timeAlertText}
    ${startRating}
  `;

  let alert: any;
  switch (type) {
    case 'withTwoButtons':
      alert = await alertController.create({
        message: dynamicContent,
        backdropDismiss: false,
        buttons: [
          {
            text: 'VER',
            role: 'accept',
            cssClass: 'alertButtonExchange',
            handler: () => {
              if (AcceptFuntion) {
                AcceptFuntion();
              } else {
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
          },
        ],
      });
      break;
    default:
      alert = await alertController.create({
        message: dynamicContent,
        backdropDismiss: false,
        buttons: [
          {
            text: SumitText,
            role: 'cancel',
            cssClass: 'alertButton',
            handler: () => {
              if (AcceptFuntion) {
                AcceptFuntion();
              } else {
                closeAlert(alertController);
              }
            },
          },
        ],
      });
  }
  await alert.present();
  if(type === 'Qualification'){
    getStart()
  } 
}

async function closeAlert(alert: any) {
  const modal = await alert.getTop();
  if (modal) {
    modal.dismiss();
  }
}

function getStart() {
  const starsContainer: HTMLElement | null = document.getElementById('starRating');
  const starsCount: number = 5;

  let selectedRating: number = 0;

  if (starsContainer) {
    for (let i: number = 1; i <= starsCount; i++) {
      const star: HTMLIonIconElement = document.createElement('ion-icon');
      star.name = 'star-outline';
      star.style.fontSize = '30px';
      star.style.color = 'gray';
      star.style.cursor = 'pointer';
      star.style.padding ='10px 5px';
     

      star.addEventListener('mouseover', () => {
        // Cambia el color de todas las estrellas hasta la actual
        for (let j: number = 1; j <= i; j++) {
          const currentStar: HTMLIonIconElement | null = starsContainer.children[j - 1] as HTMLIonIconElement;
          if (currentStar) {
            currentStar.style.color = '#ffc107';
            currentStar.name = 'star'
          }
        }
      });

      star.addEventListener('mouseout', () => {
        // Restaura el color de todas las estrellas
        for (let j: number = 1; j <= starsCount; j++) {
          const currentStar: HTMLIonIconElement | null = starsContainer.children[j - 1] as HTMLIonIconElement;
          if (currentStar) {
            currentStar.style.color = 'gray';
            currentStar.name = 'star-outline'
          }
        }
      });

      star.addEventListener('click', () => {
        selectedRating = i;
        console.log('Rating clicked:', selectedRating);
      });

      if (starsContainer) {
        starsContainer.appendChild(star);
      }
    }
  }

}

function handleStarClick(rating:any) {
  console.log('Rating clicked:', rating);
}