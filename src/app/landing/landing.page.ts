import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicSlides } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import Swiper from 'swiper';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  swiperModules = [IonicSlides];

  constructor(private alertController: AlertController,
    private router: Router,
    private requestUseCase: RequestUseCases) { }
    public ListSuggestedProducts:suggestedProducts[];
    public ListPromotions:suggestedProducts[];
    elementos: suggestedProducts[] = [];
    public activeOpen = '';
    public activeClose = '';
    public ionSegment:number = 1;

  ngOnInit() {

    this.requestUseCase.getIsActive('token').subscribe(response => {
      if (response.success === true) {
        this.activeOpen = response.data.open.toString().split(" ")[1]
        this.activeClose = response.data.close.toString().split(" ")[1]
        if(!response.data.active){this.presentAlert()}
      } else {
        console.log(response);
      }
    })

    this.requestUseCase.getSuggestedProducts('token').subscribe(response => {
      if (response.success === true) {
        response.data.forEach((elemento:any,indice:number) => {
          if(indice < 5){
            this.elementos.push(elemento);
            this.ListSuggestedProducts = this.elementos;
          }
        });
      } else {
        console.log(response);
      }
    })

    this.requestUseCase.getPromotion('token').subscribe(response => {
      if (response.success === true) {
        response.data.forEach((elemento:any,indice:number) => {
          if(indice < 5){
            this.elementos.push(elemento);
            this.ListPromotions = this.elementos;
          }
        });
      } else {
        console.log(response);
      }
    })
    
    
  }
  
  public alertButtons = ['OK'];
  public isOpen = true;

  async closeAlert() {
    const modal = await this.alertController.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

  async presentAlert() {
    const imagePath = window.location.origin + '/assets/img/cerrado.svg';
    const dynamicContent = `
    <img src="${imagePath}" alt="img cerrado">
    <h5 class="alertFont">INFORMACIÓN</h5>
    <p class="alertSubtitle">No podemos despachar tu pedido.</br>
    Nuestro Horario de Atención</p> </br>
    <b>${this.activeOpen} a ${this.activeClose}</b></br>`;

    const alert = await this.alertController.create({
      message: dynamicContent,
      backdropDismiss: false,
      buttons: [
        {
          text: 'ACEPTAR',
          role: 'cancel',
          cssClass: 'buttonWelcome',
          handler: () => {
            this.closeAlert();
          }
        }
      ]
    });
    await alert.present();
  }

  show(id:number){
    this.ionSegment = id;
  }

  search(){
    this.router.navigate(['/campaign-detail']);
  }

}
