import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      number: ['', [Validators.required,]],
      cvv: ['', [Validators.minLength(3), Validators.maxLength(3), Validators.required]],
      expirationDate: ['', [Validators.required, ]],
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
