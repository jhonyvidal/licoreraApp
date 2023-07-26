import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/store/models/user-model';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router, private userService: UserService) {}

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

  singOut(){
    this.userService.logout();
    this.getUser();
  }
}
