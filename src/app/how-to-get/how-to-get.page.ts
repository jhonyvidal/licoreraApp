import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-how-to-get',
  templateUrl: './how-to-get.page.html',
  styleUrls: ['./how-to-get.page.scss'],
})
export class HowToGetPage implements OnInit {

  lat:number = 3.57886709556234;
  lng:number = -76.49209239119809;

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

  openGoogleMap(){
    const url = `https://maps.google.com/maps?q=${this.lat},${this.lng}`;
    open(url)
  }

}
