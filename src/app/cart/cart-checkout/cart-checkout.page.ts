import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
// import { Keyboard } from '@capacitor/keyboard';
import { AlertController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { Subscription } from 'rxjs';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { PresentLoaderComponent } from 'src/shared/Loader/PresentLoaderComponent';
import { presentAlert } from 'src/shared/components/alert.component';
import { phoneMask } from 'src/shared/mask/mask';
import { AddressObjectService } from 'src/shared/services/addressObject';
import { ObserveObjectService } from 'src/shared/services/observeObject';
import { Address, cartModel } from 'src/store/models/cart.model';
import { CartService } from 'src/store/services/cart.service';
import { InfoService } from 'src/store/services/info.service';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.page.html',
  styleUrls: ['./cart-checkout.page.scss'],
})
export class CartCheckoutPage implements OnInit {

  private subscription: Subscription;

  myForm: FormGroup;
  isFormValid = false;
  buttonStyle = 'DisableButton';
  // buttonWelcome = 'contentPayChild';
  buttonWelcome = 'buttonWelcome';
  contentform = 'content-form';
  myLocations:any;
  address:any;
  subtotal: number = 0;
  delivery:number = 0;
  orderId:number;
  total:number = 0;
  transaction:number=0;
  points: number | undefined = 0;
  products:any;
  paymentMethod: any = null;
  minimumOrderAmount: string = '0';
  paymentType:string;
  readonly phoneMask: MaskitoOptions = phoneMask;
  
  constructor(public formBuilder: FormBuilder,
    private requestUseCase: RequestUseCases,
    private userService:UserService,
    private cartService:CartService,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private infoService:InfoService,
    private observeObjectService:ObserveObjectService,
    private presentLoader:PresentLoaderComponent,
    private el: ElementRef,
    private renderer: Renderer2,
    private addressObjectService:AddressObjectService
    ) {
    this.myForm = this.formBuilder.group({
      location: ['', []],
      address: ['', [Validators.required]],
      addressDetail: ['', [Validators.required]],
      contact: ['', [Validators.required,Validators.minLength(13)]],
      disccount: ['', []],
    });
    const platform = Capacitor.getPlatform();

    // if(platform !== "web") {
    //   Keyboard.addListener('keyboardDidShow', () => {
    //     this.buttonWelcome = "hiddeFooter";
    //     this.contentform = "content-form-full";
    //   });

    //   Keyboard.addListener('keyboardDidHide', () => {
    //     this.buttonWelcome = "contentPayChild";
    //     this.contentform = "content-form";
    //   });
    // }
    this.subscription = this.observeObjectService.shareObject$.subscribe(data => {
      if(data === "isPaymentSelected"){
        setTimeout(() => {
          this.getCart();
        }, 600);
      }else{
        this.paymentType = data;
        this.myForm.get('paymentMethod')?.setValue(data)
      }
    });
  }
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el:any) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
    this.getInfo();
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.classValid();
    });
    this.route.paramMap.subscribe(params => {
      this.paymentMethod = params.get('paymentMethod');
      if(this.paymentMethod !== null){
        this.myForm.get('paymentMethod')?.setValue(this.paymentMethod)
      }
      if(params.get('newAddress')){
        this.getCart();
      }
    });
  }

  ionViewWillEnter() {
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';
    this.getLocations();
    this.getCart();    
  }

  ionViewDidEnter(){
    const platform = Capacitor.getPlatform();
    // if(platform !== "web") {
    //   setTimeout(() => {
    //     this.applyStyle();
    //   }, 3000);
    // }
  }

  private applyStyle(): void {
    const contentElement = this.el.nativeElement.querySelector('.content-form');
    const maxHeight = window.innerHeight - 450
    this.renderer.setStyle(contentElement, 'height', `${maxHeight}px`);
    this.renderer.setStyle(contentElement, 'overflow-y', 'scroll');
  }

  classValid() {
    if (this.myForm.valid) {
      this.buttonStyle = 'Activebutton';
    } else {
      this.buttonStyle = 'DisableButton';
    }
  }

  sendTo(router:string){
    if(router === "new-address"){
      const address = this.addressObjectService.setObjetoCompartido('/home/tab3/cart-checkout')
    }
    if (router === "payment-methods") {
      this.router.navigate([router], {
        state: {
          contact: this.myForm.get('contact')?.value,
          disccount: this.myForm.get('disccount')?.value, 
        }
      })
    }
    this.router.navigate([router])
  }

  searchCode(){
    const data= {
      "code":this.myForm.get('disccount')?.value
    }
    this.requestUseCase
    .searchCode(
      data
    )
    .subscribe((response) => {
      console.log(response);
      if (response?.data?.length > 0) {
        this.showAlertCode(response.data[0].discount)
      } else {
        this.showAlertError(
          'El código que ingresaste no es válido. Revísalo e intenta nuevamente.',
          'LO SENTIMOS',
          '/assets/img/warningWithX.svg')
      }
    });
    
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
    if (this.subtotal > 0) {
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
              this.total = this.subtotal;
              if(response.statusCode === 8){
                this.showAlertError('Lo sentimos. En el momento no tenemos cobertura por esta zona.')
                // this.myForm.get('address')?.setValue('')
                // this.myForm.get('addressDetail')?.setValue('')
              }
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
  }

  getCart() {
    this.cartService
      .getCartData()
      .then((data) => {
        console.log('dataaaaaa: ', data);
        

        this.address = data.address;
        if(data.idOrder){
          this.orderId = data.idOrder
        }
        if(data?.address){     
          this.myForm.get('address')?.setValue(data?.address?.address)
          this.myForm.get('addressDetail')?.setValue(data?.address?.details)
          if(data?.address?.id){
            this.myForm.get('location')?.setValue(data?.address?.id)
          }
        }
        if(data?.payment){
          this.paymentType = data?.payment?.type
          this.transaction = data?.payment?.reference
          this.myForm.get('paymentMethod')?.setValue(this.paymentType)
        }
        if(data.details && data.details?.length > 0){
          // this.totalPayment(data?.details)
          this.products = data?.details;
        }
        if(data.address && data.address.latitude){
          console.log('data.address', data.address);
          
          this.validateDelivery(data.address)
        }
        if(data.number){
          this.myForm.get('contact')?.setValue(data?.number)
        }
        this.points = data.points
        this.subtotal = data.total || 0
        this.total = this.subtotal;
        this.validateDelivery(data.address);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
      });
  }

  getInfo(){
    this.infoService.getInfoData()
    .then(data => {
      console.log(data);
      
      this.minimumOrderAmount = data.minimumOrderAmount;
    })
    .catch(error => {
      console.error('Error al obtener los datos de la info:', error);
    });
  }

  // totalPayment(details:cartModel[]){
  //   // this.subtotal= details.reduce((total, producto) =>{
  //   //   if(producto?.price){
  //   //     return total + producto?.price
  //   //   }
  //   //   return total
  //   // } , 0);
  //   this.total = this.subtotal;
  // }

  updateNumber(){
    this.cartService.setNumberCartData(this.myForm.get('contact')?.value)
  }

  getToken() {
    const response = this.userService.getUserData()
    .then(data => {
      console.log('Api token: ', data.api_token);
      return data.api_token
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      this.router.navigate(['/sign-in']);
      return 'Error al obtener los datos del usuario'
    });
    return response;
  }

  async showAlertError(message:string, title?:string, img?:string) {
    title !== undefined ? null : title =  'INFORMACIÓN';
    img !== undefined ? null : img =  '/assets/img/warning.svg';
    await presentAlert(
      this.alertController,
      title,
      message,
      img
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

  async showAlertCode(discount:number) {
    await presentAlert(
      this.alertController,
      '¡FELICITACIONES!',
      `Recibirás ${discount}% de descuento sobre tu pedido.`,
      '/assets/img/checkGreen.svg',
      '',
    );
  }

  locationSelected(event: any) {

    const location = this.myLocations.find((element: any) => element.id === event.detail.value);
    console.log('Location selected: ', location);
    
    this.myForm.get('address')?.setValue(location.address);
    this.myForm.get('addressDetail')?.setValue(location.detail);
     
    this.address = {
      latitude:location.latitude,
      longitude:location.longitude
    }
    this.validateDelivery(location);

    const address:Address =   {
      id: location.id,
      address: location.address,
      latitude:location.latitude,
      longitude:location.longitude,
      details:location.detail
    }
    this.cartService.setAddressCartData(address)
  }

  async submit(){
    await this.presentLoader.showHandleLoading();
    const payload = {
      latitude:this.address.latitude,
      longitude:this.address.longitude,
      address:this.address.address,
      addressDetails:this.address.details,
      paymentMethod:this.myForm.get('paymentMethod')?.value,
      pay_method:this.myForm.get('paymentMethod')?.value,
      amount:this.total,
      phone:this.myForm.get('contact')?.value,
      discountCode:this.myForm.get('disccount')?.value,
      instructions:'',
      description:'',
      transactionId:this.transaction || ''
    }
    const token = await this.getToken()
    this.requestUseCase
    .updateOrder(
      token,
      this.orderId,
      payload,
    )
    .subscribe(
      async (response) => {
        if (response.success === true) {
          console.log('success', response);
          await this.presentLoader.hideHandleLoading();
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
    this.cartService.deleteCompleteCart();
    this.router.navigate(['/home/tab3']).then(() => {
      this.router.navigate(['/home'])
      this.getCart();
    })
    ;
  }

}
