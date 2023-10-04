import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage implements OnInit {

  constructor(private location: Location) { }
  public ionSegment:number = 1;

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  show(id:number){
    this.ionSegment = id;
  }

  submit(){

  }

}
