import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/store/models/user-model';
import { UserService } from 'src/store/services/user.service';
import { UsertAlerts } from 'src/shared/components/alert.user.component';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { AlertController } from '@ionic/angular';
import { presentAlert } from 'src/shared/components/alert.component';
import { InfoService } from 'src/store/services/info.service';
import { InfoModel } from 'src/store/models/info-model';
import { CartService } from 'src/store/services/cart.service';

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
    private infoService: InfoService) {}

  selectedTab: string = 'tab1';
  userData: UserModel;
  infoData:InfoModel
  facebook:string;
  instagram:string;
  cartQuantity:number = 0;

  ionViewWillEnter() {
    this.getUser()
    this.getInfo()
    this.getCart()
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  routerLink(route: string) {
    this.router.navigate(['/' + route]);
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
        console.log(data);
        if(data && data.details && data.details.length > 0){ 
          this.cartQuantity = data.details.length;
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
