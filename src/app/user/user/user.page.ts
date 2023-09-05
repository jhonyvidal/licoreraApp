import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  myForm: FormGroup;
  btnText: string = 'Editar';
  ionSegment:number = 1;
  starSelected: string = '../../../assets/icon/star-selected.svg';
  starEmpty: string = '../../../assets/icon/star-empty.svg';
  paymentMethods: any = [
    {
      cardNumber: '4513 **** **** 1234',
      starImage: this.starEmpty
    },
    {
      cardNumber: '4513 **** **** 1234',
      starImage: this.starEmpty
    },
    {
      cardNumber: '4513 **** **** 1234',
      starImage: this.starEmpty
    },
    {
      cardNumber: '4513 **** **** 1234',
      starImage: this.starEmpty
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, ]],
      lastName: ['', [Validators.required, ]],
      document: ['', [Validators.required, ]],
      date: ['', [Validators.required, ]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, ]],
      confirPassword: ['', []],
    });
  }

  ngOnInit() {
  }

  show(id:number){
    this.ionSegment = id;
    this.btnText = this.ionSegment === 1 ? 'Editar' : 'Agregar';
  }

  selectCard(index: number){
    for (let i = 0; i < this.paymentMethods.length; i++) {
      if (i === index) {
        this.paymentMethods[i].starImage = this.starSelected;
      }else{
        this.paymentMethods[i].starImage = this.starEmpty;
      }
    }
  }

}
