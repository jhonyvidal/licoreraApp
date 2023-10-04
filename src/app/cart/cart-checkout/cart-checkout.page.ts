import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.page.html',
  styleUrls: ['./cart-checkout.page.scss'],
})
export class CartCheckoutPage implements OnInit {
  myForm: FormGroup;
  buttonWelcome = 'contentPayChild';

  constructor(public formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      location: ['', [Validators.required]],
      address: ['', [Validators.required]],
      addressDetail: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      disccount: ['', []],
    });

    Keyboard.addListener('keyboardDidShow', () => {
      this.buttonWelcome = "hiddeFooter";
    });

    Keyboard.addListener('keyboardDidHide', () => {
      this.buttonWelcome = "contentPayChild";
    });
  }

  ngOnInit() {}
}
