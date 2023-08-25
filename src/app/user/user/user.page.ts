import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  ionSegment:number = 1;
  paymentMethods: string[] = [
    "MasterCard",
    "VISA",
    "NU",
    "Rappi Card",
    "Davivienda",
    "Bancolombia",
    "MasterCard",
    "VISA",
    "NU",
    "Rappi Card",
    "Davivienda",
    "Bancolombia"
  ];

  constructor() { }

  ngOnInit() {
  }

  show(id:number){    
    this.ionSegment = id;
  }

}
