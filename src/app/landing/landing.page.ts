import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicSlides } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import { ShareObjectService } from 'src/shared/services/shareObject';
import Swiper from 'swiper';
import { CartModelPipe } from 'src/shared/pipes/cartModel.pipe';
import { CustomDateAlert } from 'src/shared/pipes/customDateAlert.pipe';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  swiperModules = [IonicSlides];

  constructor(private alertController: AlertController,
    private router: Router,
    private requestUseCase: RequestUseCases,
    private shareObjectService: ShareObjectService,
    private CartModelPipe:CartModelPipe,
    private customDateAlert:CustomDateAlert
    ) { }
    public ListSuggestedProducts:suggestedProducts[];
    public ListPromotions:suggestedProducts[];
    public ListCampains:suggestedProducts[];
    public ListNewProducts:suggestedProducts[];
    elementos: suggestedProducts[] = [];
    public activeOpen = '';
    public activeClose = '';
    public ionSegment:number = 1;
    isLoading:boolean= false;

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
        this.ListSuggestedProducts = response.data.slice(0, 5);
      } else {
        console.log(response);
      }
    })

    this.requestUseCase.getPromotion('token').subscribe(response => {
      if (response.success === true) {
        this.ListPromotions = response.data.slice(0, 5);
      } else {
        console.log(response);
      }
    })

    this.requestUseCase.getCampains('token').subscribe(response => {
      if (response.success === true) {
        this.ListCampains = response.data.slice(0, 5);
        this.isLoading = true;
      } else {
        console.log(response);
      }
    })

    this.requestUseCase.getNewProducts('token').subscribe(response => {
      if (response.success === true) {
        console.log(response);
        
        this.ListNewProducts = response.data.slice(0, 5);
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
    const active = this.customDateAlert.transform(this.activeOpen);
    const close = this.customDateAlert.transform(this.activeClose)

    const dynamicContent = `
    <img src="${imagePath}" alt="img cerrado">
    <h5 class="alertFont">INFORMACIÓN</h5>
    <p class="alertSubtitle">No podemos despachar tu pedido.</br>
    Nuestro Horario de Atención</p> </br>
    <p class="textDateAlert"><b>${active} a ${close}</b></p></br>`;

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
    this.router.navigate(['/product-search']);
  }

  recommendedProduct(){
      this.router.navigate(['/recommended-products']);
  }

  routerLink(route: string) {
    this.router.navigate(['/' + route]);
  }

  getProductCampaign(data: any) {
    this.shareObjectService.setObjetoCompartido(data);
    this.router.navigate(['/campaign-details']);
  }

  getProductDetailById(data:any){
    this.shareObjectService.setObjetoCompartido(data)
    this.router.navigate(['/product-details']);
  }

  getProductDetail(data:any, type:string){
    if(type === "Promotion"){
      data.id = data.store_product_id
    }
    const newObject = this.CartModelPipe.transform(data);
    let product = {...newObject,origin_page:type};
    this.shareObjectService.setObjetoCompartido(product);
    this.router.navigate(['/product-details']);
  }

}
