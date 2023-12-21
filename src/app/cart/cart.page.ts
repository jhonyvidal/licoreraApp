import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { CartService } from 'src/store/services/cart.service';
import { presentAlertExchange } from 'src/shared/components/alert.exchange.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InfoService } from 'src/store/services/info.service';
import { UserService } from 'src/store/services/user.service';
import { presentAlert } from 'src/shared/components/alert.component';
import { Capacitor } from '@capacitor/core';
import { PresentLoaderComponent } from 'src/shared/Loader/PresentLoaderComponent';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss','./cart.page2.scss'],
})
export class CartPage implements OnInit {
  products: any = [];
 
  quantity: number = 0;
  total: number = 0;
  points: number = 0;
  minimumOrderAmount: number = 0;
  minimumAmountForPoints : number = 0;
  btnAccept:boolean= false;

  constructor(
    private requestUseCase: RequestUseCases,
    private cartService: CartService,
    private alertController: AlertController,
    private router: Router,
    private infoService : InfoService,
    private userService : UserService,
    private el: ElementRef,
    private renderer: Renderer2,
    private presentLoader:PresentLoaderComponent,
  ) {
    const platform = Capacitor.getPlatform();
      if(platform !== "web") {;
        setTimeout(() => {
          this.applyStyle();
        }, 3000);
      }else{
        setTimeout(() => {
          this.applyStyleWeb();
        }, 3000);
      }
  }

  private applyStyle(): void {
    const contentElement = this.el.nativeElement.querySelector('contentHeigth');
    const maxHeight = window.innerHeight - 402
    this.renderer.setStyle(contentElement, 'height', `${maxHeight}px`);
    this.renderer.setStyle(contentElement, 'overflow-y', 'scroll');
  }

  private applyStyleWeb(): void {
    const contentElements = document.getElementsByClassName('contentHeigth') as HTMLCollectionOf<HTMLElement>;
    // Verificar si hay elementos
    if (contentElements.length > 0) {
      // Obtener el primer elemento con la clase 'mainContent'
      const contentElement = contentElements[0];
      // Calcular la altura máxima
      const maxHeight = window.innerHeight - 402;
      
      // Utilizar 'style' en el elemento específico
      contentElement.style.height = `${maxHeight}px`;
      contentElement.style.overflowY = 'scroll';
    } else {
      console.error('No se encontraron elementos con la clase "mainContent".');
    }
  }


  ngOnInit() {}

  async ionViewWillEnter() {
    this.getInfo();
  }

  getCart() {
    this.cartService
      .getCartData()
      .then((data) => {
        console.log(data);
        if(data && data.details && data.details.length > 0){
          this.products = data.details;
          this.setTotal();
        }else{
          this.products = []
        }
       
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
      });
  }

  getInfo() {
    this.requestUseCase.GetInfo()
    .subscribe((response) => {
      if(response.success === true){
       this.minimumOrderAmount = response.data.minimumOrderAmount
       this.minimumAmountForPoints  = response.data.minimumAmountForPoints 
       this.getCart();
      }else{
        console.log(response);
       this.getCart();
      }
     
    });
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

  addBtn(id:number) {
    this.products.find((element:{id:number,quantitySelected:number}) => {
      if(element.id === id){
        element.quantitySelected += element.quantitySelected < 10 ? 1 : 0;
      }
    })
    this.setTotal();
    this.cartService.setProductsCartData(this.products);
    // localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(this.quantity));
  }

  subtractBtn(item:any) {
    this.products.find((element:{id:number,quantitySelected:number}) => {
      if(element.id === item.id){
        if(element.quantitySelected === 1 ){
          this.deleteProduct(item)
          return;
        }
        element.quantitySelected -= element.quantitySelected > 1 ? 1 : 0;
      }
    })
    this.setTotal();
    this.cartService.setProductsCartData(this.products);
    // localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(this.quantity));
  }

  async deleteProduct(item:any) {
    await presentAlertExchange(
      this.alertController,
      item.product.name,
      '¿Deseas eliminar este producto de tu carrito de compras?',
      'exchange-products-success',
      item.product.image,
      () => this.deleteCart(item.id),
      item.id
    );
  }

  deleteCart(item:any){
    this.cartService.deleteCart(item);
    setTimeout(() => {
      this.getCart();
    }, 600);
  }

  setTotal(){
    this.total = 0;
    if(this.products){
      this.products.forEach((e: { price: number, quantitySelected: number }) => {
        if(e.price){
          this.total = this.total + (e.price * e.quantitySelected);
        }
      });
    }
    console.log(this.total , this.minimumAmountForPoints);
    
    this.points = this.total / this.minimumAmountForPoints;
    console.log(this.points);
    
  }

  submit(){
    this.cartService.setPointsCartData(this.points,this.total)
    this.createOrder()
  }

  async createOrder(){
    await this.presentLoader.showHandleLoading();
    const resultado = this.products.reduce((acumulador:any, producto:any) => {
      if (acumulador !== '') {
        acumulador += ',';
      }
      acumulador += `${producto.id}:${producto.quantitySelected}`;
      return acumulador;
    }, '');
    const payload = {
      products:resultado,
      amount:this.total,
      instructions:'test',
      source:"mobile"
    }
    console.log(payload);
    
    const token = await this.getToken()
    this.requestUseCase
    .postOrder(
      token,
      payload
    )
    .subscribe(
      async (response) => {
        await this.presentLoader.hideHandleLoading();
        if (response?.success === true) {
          this.cartService.setIdOrderCartData(response.data.id)
          this.router.navigate(['/home/tab3/cart-checkout'])
        }else{
          this.errorAlert(response?.message) 
        }
      },
      async (error) => {
        await this.presentLoader.hideHandleLoading();
        console.error('Ha ocurrido un error:', error);
      }
    );
  }

  async errorAlert(data:string) {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
       data,
      '/assets/img/warning.svg',
      '',
      ()=>null,
      'Logout'
    );
  }


}
