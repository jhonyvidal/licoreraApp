import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/store/models/user-model';
import { UserService } from 'src/store/services/user.service';
import { UsertAlerts } from 'src/shared/components/alert.user.component';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { AlertController, MenuController } from '@ionic/angular';
import { presentAlert } from 'src/shared/components/alert.component';
import { InfoService } from 'src/store/services/info.service';
import { InfoModel } from 'src/store/models/info-model';
import { CartService } from 'src/store/services/cart.service';
import {
  PushNotification,
  PushNotificationActionPerformed,
  PushNotificationToken,
  PushNotifications,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { AlertNotifications } from 'src/shared/components/alert.notifications';
import { ShareObjectService } from 'src/shared/services/shareObject';
// import { FirebaseMessaging } from '@capacitor-firebase/messaging';
// import { StarRatingComponent } from '../../shared/components/StarRatingComponent';

type GenericAlert = {
  title: string;
  message: string;
  text: string;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private requestUseCase: RequestUseCases,
    private alertController: AlertController,
    private userService: UserService,
    private cartService: CartService,
    private infoService: InfoService,
    private menuController: MenuController,
    private shareObjectService: ShareObjectService
  ) {}

  selectedTab: string = 'tab1';
  userData: UserModel;
  infoData: InfoModel;
  facebook: string;
  instagram: string;
  cartQuantity: number = 0;
  tokenPush: string;
  jotasPoints: number = 0;

  async ngOnInit() {
    //this.showSuccessAlert('Tu pedido ya fue entregado. Por favor califica nuestro servicio.')
    //this.showInformationAlert('Tu pedido ha sido cancelado. Te invitamos a seguir comprando para que acumules puntos.')
  }

  ionViewDidEnter() {
    this.validateResultPSE()
    const platform = Capacitor.getPlatform();
    if (platform !== 'web') {
      this.createNotificationPush();
    }
    if (this.shareObjectService.getObjetoCompartido() === 'tab3') {
      this.selectedTab = 'tab3';
    }
  }

  openMenu() {
    this.getMeData();
  }

  async createNotificationPush() {
    // Verificar si el usuario está logueado
    const token = await this.getToken();
    if (!token) {
      console.log(
        'Usuario no logueado, no se registra para notificaciones push.'
      );
      return;
    }

    // Solicitar permisos para notificaciones push (generalmente solo necesario en iOS).
    await PushNotifications.requestPermissions();

    // Obtener el token del dispositivo para recibir notificaciones.
    const response = await PushNotifications.register();

    // Escuchar eventos de notificación.
    PushNotifications.addListener(
      'registration',
      async (token: PushNotificationToken) => {
        this.tokenPush = token.value;
        console.log('Token de registro:', token.value);
        this.createDevice(this.userData.uuid, token.value);
        // Suscribirse a un topic
        // try {
        //   const topic = 'promosAndroid'; // Cambia al topic deseado
        //   await FirebaseMessaging.subscribeToTopic({ topic });
        //   console.log(`Suscrito al topic: ${topic}`);
        // } catch (error) {
        //   console.error('Error al suscribirse al topic:', error);
        // }
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error al registrar el token:', error);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        console.log('Notification:', notification);
        this.createModalNotifications(
          notification.data.op,
          notification.body,
          notification.data.value
        );
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log('Notification:', notification);
        const actionId = notification.actionId;
        if (actionId === 'tap') {
          this.createModalNotifications(
            notification.notification.data.op,
            notification.notification.data.body,
            notification.notification.data.value
          );
        }
      }
    );
  }

  createDevice(uuid: string, pushkey: string) {
    const data = {
      uuid,
      pushkey,
    };
    this.requestUseCase.postDevices(data).subscribe((response) => {
      if (response.success === true) {
        console.log(response);
      } else {
        console.log(response);
      }
    });
  }

  createModalNotifications(op: string, body?: string, value?: string) {
    console.log('op ',op,' body ', body )
    if (op === '1') {
      // general
      this.showInformationAlert(body || '');
    }
    if (op === '2') {
      // birthday
      this.showInformationAlert(body || '');
    }
    if (op === '3') {
      // rateOrder
      this.showSuccessAlert(body || '');
    }
    if (op === '4') {
      // orderCancelled
      this.showInformationAlert(body || '');
    }
    if (op === '5') {
      // orderIsComing
      this.showInformationAlert(body || '');
    }
    if (op === '6') {
      // adjustPoints
      this.showInformationAlert(body || '');
    }
    if (op === '7') {
      // recommendedProduct
      this.showInformationTwoButtonsAlert(body || '');
    }
    if (op === '8') {
      console.log(body)
      // recommendedProduct
      this.showGenericAlert({
        title: 'FELICITACIONES',
        message: body || '',
        text: `Total: $ ${value} <br/>`,
      });
    }
  }

  async showGenericAlert(data: GenericAlert) {
    await AlertNotifications(
      this.alertController,
      data.title,
      data.message,
      '/assets/img/Icon_tres_jotas.svg',
      undefined,
      () => null,
      undefined,
      data.text
    );
  }

  async showInformationAlert(message: string) {
    await AlertNotifications(
      this.alertController,
      'INFORMACIÓN',
      message,
      '/assets/img/Icon_tres_jotas.svg',
      '',
      () => null
    );
  }

  async showInformationTwoButtonsAlert(message: string) {
    await AlertNotifications(
      this.alertController,
      'INFORMACIÓN',
      message,
      '/assets/img/Icon_tres_jotas.svg',
      '',
      () => null,
      'withTwoButtons'
    );
  }

  async showSuccessAlert(message: string) {
    await AlertNotifications(
      this.alertController,
      '',
      message,
      '/assets/img/checkGreen.svg',
      '',
      () => null,
      'Qualification'
    );
  }

  ionViewWillEnter() {
    this.getUser();
    this.getInfo();
    this.getCart();
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
    this.getCart();
  }

  routerLink(route: string) {
    this.router.navigate(['/' + route]);
    this.menuController.close();
  }

  menu(route: string) {
    this.router.navigate(['/' + route]);
    this.menuController.close();
  }

  getInfo() {
    this.requestUseCase.GetInfo().subscribe((response) => {
      if (response.success === true) {
        this.infoService.setInfoData(response.data);
        this.infoData = response.data;
        this.facebook = `https://www.facebook.com/${this.infoData.socialNetworks.facebook}`;
        this.instagram = `https://www.instagram.com/${this.infoData.socialNetworks.instagram}`;
      } else {
        console.log(response);
      }
    });
  }

  getMeData() {
    this.requestUseCase.getMe(this.userData.api_token).subscribe((response) => {
      if (response.success === true) {
        console.log(response);
        this.jotasPoints = response.data.points;
      } else {
        console.log('Body del error: ', response);
      }
    });
  }

  getUser() {
    console.log('Consultando getUser()');

    this.userService
      .getUserData()
      .then((data) => {
        console.log('Data: ', data);

        this.userData = data;
      })
      .catch((error) => {
        console.error('Error al obtener los datos del usuario:', error);
      });
  }

  getCart() {
    this.cartService
      .getCartData()
      .then(async (data) => {
        console.log('getCart:', data);
        if (
          data &&
          data.payment &&
          data.payment.type === 'PSE' &&
          data.idOrder
        ) {
          const token = await this.getToken();
          this.requestUseCase
            .getConfirmation(token, data.idOrder)
            .subscribe((response) => {
              console.log('response request:', response);
              if (response.success === true) {
                if (response.data.status_id === 1) {
                  this.redirecToCart();
                }
              } else {
                console.log(response);
              }
            });

          data.payment.ref_payco;
        }
        if (data && data.details && data.details.length > 0) {
          this.cartQuantity = data.details.length;
        } else {
          this.cartQuantity = 0;
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
      });
  }

  getToken() {
    const response = this.userService
      .getUserData()
      .then((data) => {
        console.log('Api token: ', data.api_token);
        return data.api_token;
      })
      .catch((error) => {
        console.error('Error al obtener los datos del usuario:', error);
        //this.router.navigate(['/sign-in']);
        return 'Error al obtener los datos del usuario';
      });
    return response;
  }

  async validateResultPSE(){
    const data = await this.getDataFromCart()
    console.log(data);
    if(data?.payment?.type === "PSE"){
      this.redirecToCart()
    }
  }

  async getDataFromCart(){
    const response = await this.cartService.
    getCartData();
    return response;
  }

  logout() {
    this.userService.logout();
    this.getUser();
  }

  redirecToCart() {
    this.router.navigate(['/payment-methods']);
  }

  async singOut() {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      '¿Seguro que quieres cerrar sesión?',
      '/assets/img/logoutAlert.svg',
      '',
      () => this.logout(),
      'Logout'
    );
  }
}
