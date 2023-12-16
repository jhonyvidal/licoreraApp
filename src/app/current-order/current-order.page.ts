import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { InfoService } from 'src/store/services/info.service';
import { UserService } from 'src/store/services/user.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
})
export class CurrentOrderPage implements OnInit {

  
  constructor(
    private requestUseCase:RequestUseCases,
    private userService:UserService,
    private router:Router,
    private alertController:AlertController,
    private infoService:InfoService,
    private location:Location
    ) { }

  currentOrder: any = {};
  minimumOrderAmount: number = 0;
  contentHeigth:string = 'content-exchange-products1';
  buttonWelcome:string = 'buttonWelcome';


  async ngOnInit() {
    const token = await this.getToken()
    if(token){
      this.getCurrentOrder()
    }
    this.getHeigthInfo()
  }

  getHeigthInfo(){
    this.infoService.getInfoData()
    .then(data => {
      if(data.height > 900){
        this.contentHeigth = 'content-exchange-products1';
      }
      else if(data.height > 750){
        this.contentHeigth = 'content-exchange-products3';
      }
      else if(data.height > 300){
        this.contentHeigth = 'content-exchange-products2';
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos de la info:', error);
    });
  }

  async getCurrentOrder(){
    const token = await this.getToken()
    console.log(token);
    
    this.requestUseCase
    .getCurrentOrder(
      token
    )
    .subscribe(
      (response) => {
        if (response.success === true) {
          if(response.data !== null){
            console.log("current: ",response.data);
            this.currentOrder = response.data
          }
          console.log('success', response);
        } else {
          console.log('success', response);
        }
      },
      (error) => {
        console.error('Ha ocurrido un error:', error);
      }
    );
  }

  getToken() {
    const response = this.userService.getUserData()
    .then(data => {
      return data?.api_token
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      this.router.navigate(['/sign-in']);
      return 'Error al obtener los datos del usuario'
    });
    return response;
  }

  async cancelAlert() {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      '¿Estás seguro que quieres cancelar el pedido?',
      '/assets/img/stop.svg',
      '',
      () => this.cancelCurrentOrder(),
      'Logout'
    );
  }

  async cancelCurrentOrder(){
      const token = await this.getToken()
      this.requestUseCase
      .cancelCurrentOrder(
        token
      )
      .subscribe(
        (response) => {
          if (response.success === true) {
            this.showAlertSuccess();
            console.log('success', response);
          } else {
            console.log('success', response);
          }
        },
        (error) => {
          console.error('Ha ocurrido un error:', error);
        }
      );
  }

  async showAlertSuccess() {
    await presentAlert(
      this.alertController,
      '¡FELICITACIONES!',
      'Te pedido fue cancelado exitosamente. Puedes seguir comprando ahora.',
      '/assets/img/checkGreen.svg',
      '',
      () => this.goToHome()
    );
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.location.back();
  }

}
