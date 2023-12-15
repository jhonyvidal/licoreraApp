import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UserService } from 'src/store/services/user.service';
import { CartService } from 'src/store/services/cart.service';
import { AlertController } from '@ionic/angular';
import { presentAlert } from 'src/shared/components/alert.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ObserveObjectService } from 'src/shared/services/observeObject';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage implements OnInit {

  constructor(private location: Location, 
    private alertController: AlertController,
    public formBuilder: FormBuilder,
    private router: Router,
    private requestUseCase:RequestUseCases,
    private userService:UserService,
    private cartService: CartService,
    private sanitizer: DomSanitizer,
    private observeObjectService:ObserveObjectService
    ) {
    this.myForm = this.formBuilder.group({
      names: ['', [Validators.required, ]],
      lastNames: ['', [Validators.required, ]],
      bankSelect: ['', [Validators.required, ]],
      documentType: ['', [Validators.required, ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
    });
    this.myFormCreditCard = this.formBuilder.group({
      names: ['', [Validators.required, ]],
      lastNames: ['', [Validators.required, ]],
      documentType: ['', [Validators.required, ]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.mySecondFormCreditCard = this.formBuilder.group({
      number: ['', [Validators.required, Validators.minLength(19)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
      expirationDate: ['', [Validators.required, Validators.minLength(7)]],
      name: ['', [Validators.required, ]],
    });
    this.myFormAlert = this.formBuilder.group({
      dues: ['',Validators.required]  // asegúrate de tener este campo en tu FormGroup
    });
  }
  public ionSegment: number = 1;
  myForm: FormGroup;
  myFormCreditCard: FormGroup;
  mySecondFormCreditCard:FormGroup;
  myFormAlert: FormGroup;
  isFormValid = false;
  isFormCreditValid=false;
  isSecondFormCreditCard=false;
  creditStep = 1;
  buttonCredit = 'buttonSubmit';
  buttonSubmit = 'buttonSubmit';
  buttonDebit = 'buttonSubmit';
  starSelected: string = '../../../assets/icon/star-selected.svg';
  starEmpty: string = '../../../assets/icon/star-empty.svg';
  segment3:string;
  bankList:any;
  paymentMethodsList: any [] = [];
  loadingPM: boolean = false;
  paymentsEmpty: boolean = false;
  isIframeReady:boolean = false;
  urlIframe:SafeResourceUrl = 'https://www.ejemplo.com';


  readonly options: MaskitoOptions = {
    mask: /^\d{0,3}$/,
  };

  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
    ],
  };

  readonly dateMask: MaskitoOptions = {
    mask: [
      ...Array(2).fill(/\d/),
      '/',
      ...Array(4).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el:any) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.validateForm();
    });
    this.myFormCreditCard.valueChanges.subscribe(() => {
      this.isFormCreditValid = this.myFormCreditCard.valid;
      this.validateForm();
    });
    this.mySecondFormCreditCard.valueChanges.subscribe(() => {
      this.isSecondFormCreditCard= this.mySecondFormCreditCard.valid;
      this.validateSecondform();
    });
    this.getBanks();
    this.getPaymentMethods();
  }

  goBack(): void {
    this.location.back();
  }

  show(id: number) {
    this.ionSegment = id;
  }

  submit() {
    this.observeObjectService.setObjetoCompartido(this.segment3)
    this.cartService.setPaymentCartData({type:this.segment3})
    this.router.navigate(['/home/tab3/cart-checkout']);
  }

  getPaymentMethods(){
    this.userService.getUserData()
    .then(data => {
      this.requestUseCase.getPaymentMethodsV2(data.api_token).subscribe(response => {
        if (response.success === true) {
          
          if (response?.data && response?.data?.cards) {
            this.paymentMethodsList = response.data.cards;
          }
          
          if (this.paymentMethodsList?.length <= 0) {
            this.paymentsEmpty = true;
            this.loadingPM = false;
          }else{
            this.loadingPM = false;
          }
          for (let i = 0; i < this.paymentMethodsList?.length; i++) {
            if (this.paymentMethodsList[i].favorite === false) {
              this.paymentMethodsList[i].starImage = this.starEmpty;
            }else{
              this.paymentMethodsList[i].starImage = this.starSelected;
            }
          }
        } else {
          console.log('Body del error response: ', response);
        }
      })
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });

  }

  async getBanks(){
    const token = await this.getToken()
    this.requestUseCase.getPaymentBanks(token).subscribe(response => {
      if (response.success === true) {
        console.log(response);
        this.bankList = response.data;
      } else {
        console.log('Body del error response: ', response);
      }
    })
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
  
  async selectCard(id:any){
    const dynamicContent = `
    <p class="alertSubtitle">¿A cuántas cuotas quieres diferir tu pago?</p></br>`;

    const alert = await this.alertController.create({
      message: dynamicContent,
      backdropDismiss: false,
      inputs:[
        {
          name:'dues',
          placeholder: 'Número de cuotas',
          attributes: {
            maxlength: 8,
          },
        },
      ],
      buttons: [
        {
          text: 'ACEPTAR',
          role: 'accept',
          cssClass: 'alertButtonExchange',
          handler: (data) => {
            if (data.dues) {
              const enteredDues = data.dues;
              this.createCreditPaymentMethod(id.token,data.dues);
            } else {
              // Handle form validation errors if needed
              console.log('Formulario no válido');
            }
          }
        },
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'alertButtonExchange',
          handler: () => {
            this.closeAlert();
          }
        }
      ]
    });
    await alert.present();

  }

  async closeAlert() {
    const modal = await this.alertController.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

  async createCreditPaymentMethod(cardtoken:string,dues:number){
    const total = await this.cartService
      .getCartData()
      .then((data) => {
         return data.total
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
        return 0;
      });

    const data = {
      value: total,
      orderId:"33",
      cardNumber:"",
      cardExpYear:"",
      cardExpMonth:"",
      cardCvc:"",
      dues:dues,
      _cardTokenId:cardtoken
    }
    const token = await this.getToken()
    this.requestUseCase. postPaymentCreditCard(token, data).subscribe(response => {
      if (response.success === true) {
        response.data.ref_payco
        response.data.cod_respuesta
        response.data.estado
        response.data.respuesta
        this.showAlertSuccess();
      } else {
        console.log('Body del error response: ', response);
      }
    })
  }

  async createPsePayment(){

    const total = await this.cartService
    .getCartData()
    .then((data) => {
       return data.total
    })
    .catch((error) => {
      console.error('Error al obtener los datos del cart:', error);
      return 0;
    });
    const data = {
      value: total,
      order_id:"35",
      bank:this.myForm.get('bankSelect')?.value,
      doc_type: this.myForm.get('documentType')?.value,
      doc_number:"123456",
      cell_phone: this.myForm.get('phone')?.value,
      name: this.myForm.get('names')?.value,
      last_name:this.myForm.get('lastNames')?.value,
      email:this.myForm.get('email')?.value,
      tax:"0",
      reference:"PSE"
    }

    const token = await this.getToken()
    this.requestUseCase.postPaymentPse(token, data).subscribe(response => {
      if (response.success === true) {
        console.log(response);
       
        this.urlIframe =  this.sanitizer.bypassSecurityTrustResourceUrl(response.data.data.urlbanco) ;
        this.isIframeReady = true

      } else {
        console.log('Body del error response: ', response);
      }
    })

  }
  

  async showAlertSuccess() {
    await presentAlert(
      this.alertController,
      '¡FELICITACIONES!',
      'Tu pago fue procesado exitosamente. Procederemos con tu pedido.',
      '/assets/img/checkGreen.svg',
      '',
      () => this.goBack()
    );
  }
  

  nextStep(id:number){
    this.creditStep = id;
  }

  validateForm(){
    if (this.myFormCreditCard.valid) {
      this.buttonSubmit = 'buttonSubmitActive'
    }
    if (this.myForm.valid) {
      this.buttonSubmit = 'buttonSubmitActive'
    }
  }

  validateSecondform(){
    if (this.mySecondFormCreditCard.valid) {
      this.buttonCredit = 'buttonCreditActive'
    }
  }

  validateSelectDebit(){
    this.buttonDebit = 'buttonSubmitActive';
  }

}
