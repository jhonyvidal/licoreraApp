import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { Data, DataArray } from 'src/shared/domain/response/PromotionsData';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { UserService } from 'src/store/services/user.service';
import { OrdersData } from 'src/shared/domain/response/OrdersData';
import { CartModelPipe } from 'src/shared/pipes/cartModel.pipe';
import { cartModel } from 'src/store/models/cart.model';
import { CartService } from 'src/store/services/cart.service';
import { presentAlert } from 'src/shared/components/alert.component';
import { AlertController } from '@ionic/angular';
import { RecentOrderPipe } from 'src/shared/pipes/recentOrder.pipe';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.page.html',
  styleUrls: ['./recent-order.page.scss','./recent-order.page2.scss'],
})
export class RecentOrderPage implements OnInit {

  status: string = 'Completado';
  pageNumber: number = 1;
  productsArray: DataArray [] = [];
  OrderId:number;
  Order:any;
  minimumOrderAmount:string
  minimumAmountForPoints:string

  constructor(
    private location: Location,
    private requestUseCase: RequestUseCases,
    private shareObjectService : ShareObjectService,
    private userService:UserService,
    private cartService:CartService,
    private recentOrderPipe: RecentOrderPipe,
    private alertController: AlertController,
    private el: ElementRef,
    private renderer: Renderer2
  ) { 
    const platform = Capacitor.getPlatform();
      if(platform !== "web") {
        setTimeout(() => {
          this.applyStyle();
        }, 500);
      }else{
        setTimeout(() => {
          this.applyStyleWeb();
        }, 500);
      }
  }

  ngOnInit() {
    this.OrderId = this.shareObjectService.getObjetoCompartido().id; 
    this.getPost(this.OrderId);

    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
      if (response.success === true) {
        console.log('Promotions: ', response);
        for (let index = 0; index < 6; index++) {
          this.productsArray.push(response.data.data[index]);
        }
        console.log(this.productsArray);
      } else {
        console.log('Body del error: ', response);
      }
    })
    this.getInfo();
  }

  async getPost(id:number){
    const token = await this.getToken()
    this.requestUseCase
    .getOrderById(
      token,
      id
    )
    .subscribe(
      (response) => {
        if (response.success === true) {
          this.Order = response.data
          console.log(this.Order);
          
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

  getInfo() {
    this.requestUseCase.GetInfo()
    .subscribe((response) => {
      if(response.success === true){
        console.log('response.data: ', response.data);
        
       this.minimumOrderAmount = response.data.minimumOrderAmount
       this.minimumAmountForPoints  = response.data.minimumAmountForPoints ;
      }else{
        console.log(response);
      }
     
    });
  }

  getToken() {
    const response = this.userService.getUserData()
    .then(data => {
      console.log('Api token: ', data.api_token);
      return data.api_token
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      return 'Error al obtener los datos del usuario'
    });
    return response;
  }

  async setCart(){
    console.log(this.Order.products.length);
    let products = []
    for(var i=0; i<this.Order.products.length; i++){
      const shareProduct = this.recentOrderPipe.transform(this.Order.products[i]) ;
      products.push(shareProduct)
    }
    this.cartService.setProductsByOneData(products)
    this.showAlertSuccess();
  }

  async showAlertSuccess() {
    await presentAlert(
      this.alertController,
      'AGREGADO EXITOSAMENTE',
      '',
      '/assets/img/successCheckout.svg',
      '',
      () => null
    );
  }

  private applyStyle(): void {
    const contentElement = this.el.nativeElement.querySelector('list-container');

    const maxHeight = window.innerHeight - 533
    this.renderer.setStyle(contentElement, 'height', `${maxHeight}px`);
    this.renderer.setStyle(contentElement, 'overflow-y', 'scroll');
  }

  private applyStyleWeb(): void {
    console.log(window.innerHeight);
    const contentElements = document.getElementsByClassName('list-container') as HTMLCollectionOf<HTMLElement>;
    // Verificar si hay elementos
    if (contentElements.length > 0) {
      // Obtener el primer elemento con la clase 'mainContent'
      const contentElement = contentElements[0];
      // Calcular la altura máxima
      const maxHeight = window.innerHeight -533;
      
      // Utilizar 'style' en el elemento específico
      contentElement.style.height = `${maxHeight}px`;
      contentElement.style.overflowY = 'scroll';
    } else {
      console.error('No se encontraron elementos con la clase "mainContent".');
    }
  }

  goBack(): void {
    this.location.back();
  }

}
