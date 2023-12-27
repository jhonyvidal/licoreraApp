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
import { PushNotification, PushNotificationActionPerformed, PushNotificationToken, PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { AlertNotifications } from 'src/shared/components/alert.notifications';
import { ShareObjectService } from 'src/shared/services/shareObject';
// import { StarRatingComponent } from '../../shared/components/StarRatingComponent'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router, 
    private requestUseCase: RequestUseCases,
    private alertController: AlertController,
    private userService: UserService,
    private cartService:CartService,
    private infoService: InfoService,
    private menuController: MenuController,
    private shareObjectService:ShareObjectService
    ) {
   
    }

  selectedTab: string = 'tab1';
  userData: UserModel;
  infoData:InfoModel
  facebook:string;
  instagram:string;
  cartQuantity:number = 0;
  tokenPush:string;
 

  async ngOnInit(){
    const platform = Capacitor.getPlatform();
    if(platform !== "web") {
      this.createNotificationPush();
    }
    //this.showSuccessAlert('Tu pedido ya fue entregado. Por favor califica nuestro servicio.')
    //this.showInformationAlert('Tu pedido ha sido cancelado. Te invitamos a seguir comprando para que acumules puntos.')
  }

  ionViewDidEnter(){
    if( this.shareObjectService.getObjetoCompartido() === 'tab3'){
      this.selectedTab = 'tab3';
    }
  }

  async createNotificationPush(){
    
    // Solicitar permisos para notificaciones push (generalmente solo necesario en iOS).
    await PushNotifications.requestPermissions();

    // Obtener el token del dispositivo para recibir notificaciones.
    const response = await PushNotifications.register();

    // Escuchar eventos de notificación.
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      this.tokenPush = token.value;
      this.createDevice('15DC8E4D-0006-4986-970A-49674C7E04A1',token.value)
      console.log('Token de registro:', token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error al registrar el token:', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      this.createModalNotifications(notification.data.op,notification.data.valud)
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      const actionId = notification.actionId;
      if(actionId === "tap"){
        this.createModalNotifications(notification.notification.data.op,notification.notification.data.value)
      }
    });
  }

  createDevice(uuid:string,pushkey:string){
    const data = {
      uuid,
      pushkey
    }
    this.requestUseCase
    .postDevices(
      data
    )
    .subscribe((response) => {
      if (response.success === true) {
        console.log(response);
      } else {
        console.log(response);
      }
    });  
  }

  createModalNotifications(op:string, body:string){
    if(op === "1"){
      // general
      this.showInformationAlert(body || '')
    }
    if(op === "2"){
      // birthday
      this.showInformationAlert(body|| '')
    }
    if(op === "3"){
      // rateOrder
      this.showInformationAlert(body || '')
    }
    if(op === "4"){
      // orderCancelled
      this.showInformationAlert(body|| '')
    }
    if(op === "5"){
      // orderIsComing
      this.showSuccessAlert(body || '')
    }
    if(op=== "6"){
      // adjustPoints
      this.showInformationAlert(body || '')
    }
    if(op === "7"){
      // recommendedProduct
      this.showInformationTwoButtonsAlert(body || '')
    }
  }

  async showInformationAlert(message:string) {
    await AlertNotifications(
      this.alertController,
      'INFORMACIÓN',
      message,
      '/assets/img/Icon_tres_jotas.svg',
      '',
      () => null
    );
  }

  async showInformationTwoButtonsAlert(message:string) {
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

  async showSuccessAlert(message:string) {
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
    this.getUser()
    this.getInfo()
    this.getCart()
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
    this.getCart()
  }

  routerLink(route: string) {
    this.router.navigate(['/' + route]);
  }

  menu(route: string){
    this.router.navigate(['/' + route]);
    this.menuController.close();
  }

  getInfo(){
    this.requestUseCase.GetInfo()
    .subscribe((response) => {
      if(response.success === true){
        this.infoService.setInfoData(response.data)
        this.infoData = response.data;
        this.facebook = `https://www.facebook.com/${this.infoData.socialNetworks.facebook}`
        this.instagram = `https://www.instagram.com/${this.infoData.socialNetworks.instagram}`
      }else{
        console.log(response);
      }
    });
  }

  getUser(){
    this.userService.getUserData()
    .then(data => {
      this.userData = data;
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
  }

  getCart() {
    this.cartService
      .getCartData()
      .then((data) => {
        if(data && data.details && data.details.length > 0){ 
          this.cartQuantity = data.details.length;
        }else{
          this.cartQuantity = 0;
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
      });
  }

  logout(){
    this.userService.logout();
    this.getUser();
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
