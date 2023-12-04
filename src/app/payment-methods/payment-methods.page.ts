import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage implements OnInit {
  constructor(private location: Location, 
    public formBuilder: FormBuilder,
    private router: Router,
    ) {
    this.myForm = this.formBuilder.group({
      names: ['', [Validators.required, ]],
      lastNames: ['', [Validators.required, ]],
      bankSelect: ['', [Validators.required, ]],
      documentType: ['', [Validators.required, ]],
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
  }
  public ionSegment: number = 1;
  myForm: FormGroup;
  myFormCreditCard: FormGroup;
  mySecondFormCreditCard:FormGroup;
  isFormValid = false;
  isFormCreditValid=false;
  isSecondFormCreditCard=false;
  creditStep = 1;
  buttonCredit = 'buttonSubmit';
  buttonSubmit = 'buttonSubmit';
  buttonDebit = 'buttonSubmit';
  segment3:string;

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
  }

  goBack(): void {
    this.location.back();
  }

  show(id: number) {
    this.ionSegment = id;
  }

  submit() {
    let datos = { mensaje: 'EN CASA' };
    this.router.navigate(['/home/tab3/cart-checkout',{ paymentMethod: datos.mensaje }]);
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
