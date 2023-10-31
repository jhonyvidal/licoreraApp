import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.page.html',
  styleUrls: ['./cart-checkout.page.scss'],
})
export class CartCheckoutPage implements OnInit {
  myForm: FormGroup;
  buttonWelcome = 'contentPayChild';
  contentform = 'content-form';

  constructor(public formBuilder: FormBuilder,private router: Router) {
    this.myForm = this.formBuilder.group({
      location: ['', [Validators.required]],
      address: ['', [Validators.required]],
      addressDetail: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      disccount: ['', []],
    });
    const platform = Capacitor.getPlatform();

    if(platform !== "web") {
      Keyboard.addListener('keyboardDidShow', () => {
        this.buttonWelcome = "hiddeFooter";
        this.contentform = "content-form-full";
      });

      Keyboard.addListener('keyboardDidHide', () => {
        this.buttonWelcome = "contentPayChild";
        this.contentform = "content-form";
      });
    }
  }

  ngOnInit() {}

  sendTo(router:string){
    this.router.navigate([router])
  }

}
