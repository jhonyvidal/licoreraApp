import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { PostPaymentMethodsRequest } from 'src/shared/domain/request/DeletePaymentRequest';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.page.html',
  styleUrls: ['./credit-card.page.scss'],
})
export class CreditCardPage implements OnInit {

  myForm: FormGroup;
  requestDataPaymentMethods: PostPaymentMethodsRequest;
  isFormValid: boolean = true;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private requestUseCase: RequestUseCases,
    private userService: UserService
  ) {
    this.myForm = this.formBuilder.group({
      number: ['', [Validators.required, ]],
      cvv: ['', [Validators.required, ]],
      expirationDate: ['', [Validators.required, ]],
      name: ['', [Validators.required, ]],
    });
   }

  ngOnInit() {
    this.myForm.valueChanges.subscribe(() => {
      if (this.myForm.valid) {
        this.isFormValid = false;
      }else{
        this.isFormValid = true;
      }
    });
  }

  createPaymentMethod(){

    this.requestDataPaymentMethods = {
      number: this.myForm.get('number')?.value,
      cvv: this.myForm.get('cvv')?.value,
      expirationDate: this.myForm.get('expirationDate')?.value,
      name: this.myForm.get('name')?.value,
      favorite: false
    }

    this.userService.getUserData()
    .then(data => {
      this.requestUseCase.postPaymentMethods(data.api_token, this.requestDataPaymentMethods).subscribe(response => {
        if (response.success === true) {
          console.log('Payment method created successfully');

        } else {
          console.log('Body del error: ', response);
        }
      })
    })


  }

  closeCreditCardScreen(){
    this.router.navigate(['/user']);
  }

}
