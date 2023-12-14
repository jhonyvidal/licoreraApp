import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UsertAlerts } from 'src/shared/components/alert.user.component';
import { PostPaymentMethodsRequest } from 'src/shared/domain/request/DeletePaymentRequest';
import { UserService } from 'src/store/services/user.service';

import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

// Maskito for input masking
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { CardYearValidation } from 'src/shared/CustomValidations/CardYearValidation';

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
  ) {
    this.myForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.minLength(19)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
      expirationDate: ['', [Validators.required, Validators.minLength(7)]],
      name: ['', [Validators.required, CardYearValidation()]],
    });

  }

  ngOnInit() {

    this.todayDate = new Date();
    let currentYear = this.todayDate.getFullYear();
    let currentMonth = String(this.todayDate.getMonth()+1).padStart(2,"0");
    
    this.minDate = `${currentYear}-${currentMonth}`;
    this.detectChanges();

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

  createPaymentMethod(id: number){
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
        if (response.success === true) {
          this.router.navigate(['/user']);
        } else {
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
      () => this.createPaymentMethod(1)
    );
  }

}
