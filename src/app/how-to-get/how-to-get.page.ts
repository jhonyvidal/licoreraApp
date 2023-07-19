import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-how-to-get',
  templateUrl: './how-to-get.page.html',
  styleUrls: ['./how-to-get.page.scss'],
})
export class HowToGetPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  llamar(numeros: string): void {
    const numerosArray = numeros.split(',');
    numerosArray.forEach((numero) => {
      window.open('tel:' + numero, '_system');
    });
  }

}
