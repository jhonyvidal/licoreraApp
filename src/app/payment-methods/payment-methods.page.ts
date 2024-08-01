import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UserService } from 'src/store/services/user.service';
import { CartService } from 'src/store/services/cart.service';
import { AlertController, IonModal } from '@ionic/angular';
import { presentAlert } from 'src/shared/components/alert.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ObserveObjectService } from 'src/shared/services/observeObject';
import { PresentLoaderComponent } from 'src/shared/Loader/PresentLoaderComponent';
import { OverlayEventDetail } from '@ionic/core/components';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { CardYearValidation } from 'src/shared/CustomValidations/CardYearValidation';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage implements OnInit {
  constructor(
    private location: Location,
    private alertController: AlertController,
    public formBuilder: FormBuilder,
    private router: Router,
    private requestUseCase: RequestUseCases,
    private userService: UserService,
    private cartService: CartService,
    private sanitizer: DomSanitizer,
    private observeObjectService: ObserveObjectService,
    private presentLoader: PresentLoaderComponent,
    private ngZone: NgZone,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.myForm = this.formBuilder.group({
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      bankSelect: ['', [Validators.required]],
      document: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
    });
    this.myFormCreditCard = this.formBuilder.group({
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.mySecondFormCreditCard = this.formBuilder.group({
      number: ['', [Validators.required, Validators.minLength(19)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
      expirationDate: ['', [Validators.required, Validators.minLength(7), CardYearValidation()]],
      name: ['', [Validators.required]],
    });
    this.myFormAlert = this.formBuilder.group({
      dues: ['', Validators.required], // asegúrate de tener este campo en tu FormGroup
    });
    const platform = Capacitor.getPlatform();
    if (platform !== 'web') {
      Keyboard.addListener('keyboardWillShow', (info) => {
        console.log('se activo teclado');
        this.ngZone.run(() => {
          this.applyKeyboardStyle(info.keyboardHeight);
        });
      });
      Keyboard.addListener('keyboardDidHide', () => {
        this.applykeyboarHide();
      });
    }
  }
  public ionSegment: number = 1;
  myForm: FormGroup;
  myFormCreditCard: FormGroup;
  mySecondFormCreditCard: FormGroup;
  myFormAlert: FormGroup;
  isFormValid = false;
  isFormCreditValid = false;
  isSecondFormCreditCard = false;
  creditStep = 1;
  buttonCredit = 'buttonSubmit';
  buttonSubmit = 'buttonSubmit';
  buttonDebit = 'buttonSubmit';
  starSelected: string = '../../../assets/icon/star-selected.svg';
  starEmpty: string = '../../../assets/icon/star-empty.svg';
  segment3: string;
  bankList: any;
  paymentMethodsList: any[] = [];
  loadingPM: boolean = false;
  paymentsEmpty: boolean = false;
  isIframeReady: boolean = false;
  urlIframe: SafeResourceUrl = 'https://www.ejemplo.com';
  @ViewChild(IonModal) modal: IonModal;

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
    mask: [...Array(2).fill(/\d/), '/', ...Array(4).fill(/\d/)],
  };

  @ViewChild('modalContainer', { static: false }) modalContainer: ElementRef;

  private applykeyboarHide() {
    const contentElement = this.modalContainer.nativeElement;
    this.renderer.setStyle(contentElement, 'max-height', `100%`);
  }

  private applyKeyboardStyle(keyboardHeight: number): void {
    if (this.modalContainer && this.modalContainer.nativeElement) {
      const contentElement = this.modalContainer.nativeElement;
      console.log(contentElement);
      const maxHeight = window.innerHeight - (keyboardHeight - 50);
      this.renderer.setStyle(contentElement, 'max-height', `${maxHeight}px`);
      this.renderer.setStyle(contentElement, 'overflow-y', 'scroll');
    } else {
      console.error(
        'El elemento modalContainer no existe o no se ha inicializado correctamente.'
      );
    }
  }

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el: any) =>
    (el as HTMLIonInputElement).getInputElement();

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
      this.isSecondFormCreditCard = this.mySecondFormCreditCard.valid;
      this.validateSecondform();
    });
    this.getBanks();
    this.getPaymentMethods();
    this.clearAll()
  }

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  clearAll() {
    this.mySecondFormCreditCard.get('number')?.setValue(null);
    this.mySecondFormCreditCard.get('cvv')?.setValue(null);
    this.mySecondFormCreditCard.get('expirationDate')?.setValue(null);
    this.mySecondFormCreditCard.get('name')?.setValue(null);
  }

  cancel() {
    this.clearAll()
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  formatCreditCardNumber(input: string): string {
    let inputFormated: string = '';
    for (let i = 0; i < input.length; i++) {
      if (i === 4 || i === 8 || i === 12) {
        inputFormated = inputFormated + ' ' + input[i];
      } else {
        inputFormated = inputFormated + input[i];
      }
    }
    return inputFormated;
  }

  goBack(): void {
    this.location.back();
  }

  show(id: number) {
    this.ionSegment = id;
  }

  submit() {
    this.observeObjectService.setObjetoCompartido(this.segment3);
    this.cartService.setPaymentCartData({ type: this.segment3 });
    this.router.navigate(['/home/tab3/cart-checkout']);
  }

  getPaymentMethods() {
    this.userService
      .getUserData()
      .then((data) => {
        this.requestUseCase
          .getPaymentMethodsV2(data.api_token)
          .subscribe((response) => {
            if (response.success === true) {
              if (response?.data && response?.data?.cards) {
                for (var i = 0; i < response.data.cards.length; i++) {
                  response.data.cards[i].mask = this.formatCreditCardNumber(
                    response.data.cards[i].mask
                  );
                }
                this.paymentMethodsList = response.data.cards;
              }

              if (this.paymentMethodsList?.length <= 0) {
                this.paymentsEmpty = true;
                this.loadingPM = false;
              } else {
                this.loadingPM = false;
              }
              for (let i = 0; i < this.paymentMethodsList?.length; i++) {
                if (this.paymentMethodsList[i].favorite === false) {
                  this.paymentMethodsList[i].starImage = this.starEmpty;
                } else {
                  this.paymentMethodsList[i].starImage = this.starSelected;
                }
              }
            } else {
              console.log('Body del error response: ', response);
            }
          });
      })
      .catch((error) => {
        console.error('Error al obtener los datos del usuario:', error);
      });
  }

  async getBanks() {
    const token = await this.getToken();
    this.requestUseCase.getPaymentBanks(token).subscribe((response) => {
      if (response.success === true) {
        console.log(response);
        this.bankList = response.data;
      } else {
        console.log('Body del error response: ', response);
      }
    });
  }

  getToken() {
    const response = this.userService
      .getUserData()
      .then((data) => {
        console.log('Api token: ', data.api_token);
        return data.api_token;
      })
      .catch((error) => {
        console.error('Error al obtener los datos del usuario:', error);
        return 'asdasd';
      });
    return response;
  }

  async selectCard(id: any) {
    const dynamicContent = `
    <p class="alertSubtitle">¿A cuántas cuotas quieres diferir tu pago?</p></br>`;

    const alert = await this.alertController.create({
      message: dynamicContent,
      backdropDismiss: false,
      inputs: [
        {
          name: 'dues',
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
              this.createCreditPaymentMethod(id.token, data.dues);
            } else {
              // Handle form validation errors if needed
              console.log('Formulario no válido');
            }
          },
        },
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'alertButtonExchange',
          handler: () => {
            this.closeAlert();
          },
        },
      ],
    });
    await alert.present();
  }

  async payCard() {
    const dynamicContent = `
    <p class="alertSubtitle">¿A cuántas cuotas quieres diferir tu pago?</p></br>`;

    const alert = await this.alertController.create({
      message: dynamicContent,
      backdropDismiss: false,
      inputs: [
        {
          name: 'dues',
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
              this.createCreditPaymentMethodComplete(enteredDues);
            } else {
              // Handle form validation errors if needed
              console.log('Formulario no válido');
            }
          },
        },
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'alertButtonExchange',
          handler: () => {
            this.closeAlert();
          },
        },
      ],
    });
    await alert.present();
  }

  async closeAlert() {
    const modal = await this.alertController.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

  async createCreditPaymentMethod(cardtoken: string, dues: number) {
    await this.presentLoader.showHandleLoading();
    const reponse = await this.cartService
      .getCartData()
      .then((data) => {
        return {
          total: data.total,
          idOrder: data.idOrder,
        };
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
        return {
          total: 0,
          idOrder: 0,
        };
      });

    const data = {
      value: reponse.total,
      orderId: reponse.idOrder,
      cardNumber: '',
      cardExpYear: '',
      cardExpMonth: '',
      cardCvc: '',
      dues: dues,
      _cardTokenId: cardtoken,
    };
    const token = await this.getToken();
    this.requestUseCase
      .postPaymentCreditCard(token, data)
      .subscribe(async (response) => {
        if (response.success === true) {
          const payment = {
            type: 'Credit Card',
            reference: response.data.ref_payco,
            status: response.data.estado,
            code: response.data.cod_respuesta,
            response: response.data.respuesta,
          };
          this.cartService.setPaymentCartData(payment);
          this.observeObjectService.setObjetoCompartido('Tarjeta de credito');
          await this.presentLoader.hideHandleLoading();
          this.showAlertSuccess();
        } else {
          console.log('Body del error response: ', response);
        }
      });
  }

  async createCreditPaymentMethodComplete(dues: number) {
    await this.presentLoader.showHandleLoading();
    const reponse = await this.cartService
      .getCartData()
      .then((data) => {
        return {
          total: data.total,
          idOrder: data.idOrder,
        };
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
        return {
          total: 0,
          idOrder: 0,
        };
      });

    const cardNumber = this.mySecondFormCreditCard
      .get('number')
      ?.value.replaceAll(' ', '');

    const data = {
      value: reponse.total,
      orderId: reponse.idOrder,
      cardNumber: cardNumber,
      cardExpYear: this.mySecondFormCreditCard
        .get('expirationDate')
        ?.value.split('/')[1],
      cardExpMonth: this.mySecondFormCreditCard
        .get('expirationDate')
        ?.value.split('/')[0],
      cardCvc: this.mySecondFormCreditCard.get('cvv')?.value,
      dues: dues,
      _cardTokenId: '',
    };

    const token = await this.getToken();
    this.requestUseCase
      .postPaymentCreditCard(token, data)
      .subscribe(async (response) => {
        if (response.success === true) {
          const payment = {
            type: 'Credit Card',
            reference: response.data.ref_payco,
            status: response.data.estado,
            code: response.data.cod_respuesta,
            response: response.data.respuesta,
          };
          this.cartService.setPaymentCartData(payment);
          this.observeObjectService.setObjetoCompartido('Credit Card');
          await this.presentLoader.hideHandleLoading();
          this.showAlertSuccess();
        } else {
          console.log('Body del error response: ', response);
        }
      });
  }

  async createPsePayment() {
    this.presentLoader.showHandleLoading();
    const reponse = await this.cartService
      .getCartData()
      .then((data) => {
        return {
          total: data.total,
          idOrder: data.idOrder,
        };
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
        return {
          total: 0,
          idOrder: 0,
        };
      });
    const data = {
      value: reponse.total,
      order_id: reponse.idOrder,
      bank: this.myForm.get('bankSelect')?.value,
      doc_type: this.myForm.get('documentType')?.value,
      doc_number: this.myForm.get('document')?.value,
      cell_phone: this.myForm.get('phone')?.value,
      name: this.myForm.get('names')?.value,
      last_name: this.myForm.get('lastNames')?.value,
      email: this.myForm.get('email')?.value,
      tax: '0',
      reference: 'PSE',
      isWeb:false
    };

    const token = await this.getToken();
    this.requestUseCase.postPaymentPse(token, data).subscribe((response) => {
      this.presentLoader.hideHandleLoading();
      if (response.data.success === true) {
        console.log(response);
        this.cartService.setPaymentCartData({
          type: 'PSE',
          ref_payco: response.data.data.ref_payco,
        });
        this.openLink(response.data.data.urlbanco);
        // this.urlIframe =  this.sanitizer.bypassSecurityTrustResourceUrl(response.data.data.urlbanco) ;
        // this.isIframeReady = true
      } else {
        console.log('Body del error response: ', response);
      }
    });
  }

  openLink(url: string) {
    open(url);
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

  nextStep(id: number) {
    this.creditStep = id;
  }

  validateForm() {
    if (this.myFormCreditCard.valid) {
      this.buttonSubmit = 'buttonSubmitActive';
    }
    if (this.myForm.valid) {
      this.buttonSubmit = 'buttonSubmitActive';
    }
  }

  validateSecondform() {
    if (this.mySecondFormCreditCard.valid) {
      this.buttonCredit = 'buttonCreditActive';
    }
  }

  validateSelectDebit() {
    this.buttonDebit = 'buttonSubmitActive';
  }
}
