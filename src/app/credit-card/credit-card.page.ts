import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UsertAlerts } from 'src/shared/components/alert.user.component';
import { PostPaymentMethodsRequest } from 'src/shared/domain/request/DeletePaymentRequest';
import { UserService } from 'src/store/services/user.service';
import { PresentLoaderComponent } from 'src/shared/Loader/PresentLoaderComponent';

// Maskito for input masking
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { CardYearValidation } from 'src/shared/CustomValidations/CardYearValidation';
import { presentAlert } from 'src/shared/components/alert.component';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.page.html',
  styleUrls: ['./credit-card.page.scss'],
})
export class CreditCardPage implements OnInit {

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

  myForm: FormGroup;
  todayDate: Date;
  minDate = '';
  requestDataPaymentMethods: PostPaymentMethodsRequest;
  isFormValid: boolean = true;
  btnCSS: string = 'btn-footer-disabled';
  numberInput: string;
  dateInput: string;
  cvvInput: string;
  nameInput: string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private requestUseCase: RequestUseCases,
    private userService: UserService,
    private alertController: AlertController,
    private presentLoader: PresentLoaderComponent
  ) {
    this.myForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.minLength(19)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
      expirationDate: ['', [Validators.required, Validators.minLength(7), CardYearValidation()]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {

    this.todayDate = new Date();
    let currentYear = this.todayDate.getFullYear();
    let currentMonth = String(this.todayDate.getMonth()+1).padStart(2,"0");
    
    this.minDate = `${currentYear}-${currentMonth}`;
    this.detectChanges();

  }

  async mostrarLoading() {
    this.createPaymentMethod();
  }

  detectChanges() {
    this.myForm.valueChanges.subscribe(() => {
      if (this.myForm.valid) {
        this.isFormValid = false;
        this.btnCSS = 'btn-footer';
      }else{
        this.isFormValid = true;
        this.btnCSS = 'btn-footer-disabled';
      }
    });
  }

  // createPaymentMethod(id: number){
  createPaymentMethod(){
    this.presentLoader.showHandleLoading()
    let exp_month = this.myForm.get('expirationDate')?.value.split('/')[0];
    let exp_year = this.myForm.get('expirationDate')?.value.split('/')[1];

    this.requestDataPaymentMethods = {
      number: this.myForm.get('number')?.value.replace( /\s/g, ''),
      cvv: this.myForm.get('cvv')?.value,
      name: this.myForm.get('name')?.value,
      favorite: false,
      exp_month: exp_month,
      exp_year: exp_year,
    }

    this.userService.getUserData()
    .then(data => {
      this.requestUseCase.postPaymentMethods(data.api_token, this.requestDataPaymentMethods).subscribe(response => {
        this.presentLoader.hideHandleLoading()
        if (response.success === true) {
          // this.router.navigate(['/user']);
          console.log(response);
          this.showAlertCreatePaymentMethod();
          
        } else {
          if(response.statusCode === 0){
            this.showAlertError(response.message.description)
          }
          
          console.log('Body del error: ', response);
        }
      })
    })
  }

  closeCreditCardScreen(){
    this.router.navigate(['/user']);
  }

  async showAlertCreatePaymentMethod() {
    const usert_alerts = new UsertAlerts(this.router, this.userService, this.requestUseCase);
    await usert_alerts.presentAlertUser(
      this.alertController,
      '¡Felicitaciones!',
      'La tarjeta fue agregada exitosamente.',
      'congrats',
      undefined,
      undefined,
      undefined
    );
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

}
