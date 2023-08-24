import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.page.html',
  styleUrls: ['./cart-checkout.page.scss'],
})
export class CartCheckoutPage implements OnInit {
  myForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      location: ['', [Validators.required]],
      address: ['', [Validators.required]],
      addressDetail: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      disccount: ['', []],
    });
  }

  ngOnInit() {}
}
