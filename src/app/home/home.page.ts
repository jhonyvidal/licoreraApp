import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/store/models/user-model';
import { UserService } from 'src/store/services/user.service';
import { UsertAlerts } from 'src/shared/components/alert.user.component';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { AlertController } from '@ionic/angular';
import { presentAlert } from 'src/shared/components/alert.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router, 
    private requestUseCase: RequestUseCases,
    private alertController: AlertController,
    private userService: UserService) {}

  selectedTab: string = 'tab1';
  userData: UserModel;

  ionViewWillEnter() {
    this.getUser()
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  routerLink(route: string) {
    this.router.navigate(['/' + route]);
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

  logout(){
    this.userService.logout();
    this.getUser();
  }

  async singOut() {
    // const usert_alerts = new UsertAlerts(this.router, this.userService, this.requestUseCase);
    // await usert_alerts.presentAlertUser(
    //   this.alertController,
    //   'INFORMACIÓN',
    //   '¿Seguro que quieres cerrar sesión?',
    //   'logout',
    //   undefined,
    //   this.logout()
    // );
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
