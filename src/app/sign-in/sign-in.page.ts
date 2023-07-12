import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  myForm: FormGroup;
  
  constructor( public formBuilder: FormBuilder,) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', Validators.required,Validators.email]
    });
   }

  ngOnInit() {
  }

}
