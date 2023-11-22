import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { Address, cartModel } from 'src/store/models/cart.model';
import { CartService } from 'src/store/services/cart.service';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.page.html',
  styleUrls: ['./cart-checkout.page.scss'],
})
export class CartCheckoutPage implements OnInit {
  myForm: FormGroup;
  buttonWelcome = 'contentPayChild';
  contentform = 'content-form';
  myLocations:any;
  address:any;
  subtotal: number = 0;
  delivery:number = 0;
  total:number = 0;
  products:any;

  constructor(public formBuilder: FormBuilder,
    private requestUseCase: RequestUseCases,
    private userService:UserService,
    private cartService:CartService,
    private alertController: AlertController,
    private router: Router) {
    this.myForm = this.formBuilder.group({
      location: ['', [Validators.required]],
      address: ['', [Validators.required]],
      addressDetail: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      disccount: ['', []],
    });
    const platform = Capacitor.getPlatform();

    if(platform !== "web") {
      Keyboard.addListener('keyboardDidShow', () => {
        this.buttonWelcome = "hiddeFooter";
        this.contentform = "content-form-full";
      });

      Keyboard.addListener('keyboardDidHide', () => {
        this.buttonWelcome = "contentPayChild";
        this.contentform = "content-form";
      });
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getLocations();
    this.getCart();
  }

  sendTo(router:string){
    this.router.navigate([router])
  }

  async getLocations(){
    const token = await this.getToken()
    this.requestUseCase.getMeLocation(token)
    .subscribe((response) => {
      if(response.success === true){
        this.myLocations = response.data;
        console.log(this.myLocations)
      }else{
        console.log(response);
      }
     
    });
  }

  validateDelivery(data:any){
    const payload = {
      latitude:data.latitude,
      longitude: data.longitude,
      orderValue:this.subtotal
    }
    this.requestUseCase
      .PostDelivery(
        payload
      )
      .subscribe(
        (response) => {
          if (response.success === true) {
            this.delivery = parseInt(response.data)
            this.total = this.subtotal + this.delivery
          } else {
            console.log('error', response);
          }
        },
        (error) => {
          if(error.error.statusCode === 0){
            this.showAlertError('Lo sentimos. En el momento no tenemos cobertura por esta zona.')
          }
          console.error('Ha ocurrido un error:', error);
        }
      );
  }

  getCart() {
    this.cartService
      .getCartData()
      .then((data) => {
        console.log(data);
        this.address = data.address;
        this.myForm.get('address')?.setValue(this.address?.address)
        this.myForm.get('addressDetail')?.setValue(this.address?.details)
        if(data.details && data.details?.length > 0){
          this.totalPayment(data?.details)
          this.products = data?.details;
        }
        if(data.address && data.address.latitude){
          this.validateDelivery(data.address)
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
      });
  }

  totalPayment(details:cartModel[]){
    this.subtotal= details.reduce((total, producto) => total + producto.price, 0);
  }

  getToken() {
    const response = this.userService.getUserData()
    .then(data => {
      console.log('Api token: ', data.api_token);
      return data.api_token
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      return 'asdasd'
    });
    return response;
  }

  async showAlertError(message:string) {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
       message,
      '/assets/img/warning.svg'
    );
  }

  async showAlertSuccess() {
    await presentAlert(
      this.alertController,
      'PEDIDO RECIBIDO',
      'Gracias por tu pedido. Lo recibirás en <b> 15 min aprox </b>',
      '/assets/img/successCheckout.svg',
      '',
      () => this.goHome()
    );
  }

  async submit(){
    const resultado = this.products.reduce((acumulador:any, producto:any) => {
      if (acumulador !== '') {
        acumulador += ',';
      }
      acumulador += `${producto.id}:${producto.quantitySelected}`;
      return acumulador;
    }, '');
    const payload = {
      latitude:this.address.latitude,
      longitude:this.address.longitude,
      products:resultado,
      address:this.address.address,
      addressDetails:this.address.details,
      paymentMethod:'Efectivo',
      pay_method:'Efectivo',
      amount:this.total,
      phone:this.myForm.get('contact')?.value,
      discountCode:this.myForm.get('disccount')?.value,
      instructions:'test'
    }
    const token = await this.getToken()
    this.requestUseCase
    .postOrder(
      token,
      payload
    )
    .subscribe(
      (response) => {
        if (response.success === true) {
          console.log('success', response);
          this.showAlertSuccess();
        } else {
          if(response.message.includes('El producto')){
            this.showAlertError(response.message);
          }else{
            this.showAlertError('Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.')
          }
        }
      },
      (error) => {
      
        console.error('Ha ocurrido un error:', error);
      }
    );
    
  }

  goHome(){

  }

}
