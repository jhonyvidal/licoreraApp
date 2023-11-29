import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { InfoService } from 'src/store/services/info.service';
import { InfoModel } from 'src/store/models/info-model';

@Component({
  selector: 'app-how-to-get',
  templateUrl: './how-to-get.page.html',
  styleUrls: ['./how-to-get.page.scss'],
})
export class HowToGetPage implements OnInit {

  lat:number = 7.068565;
  lng:number = -73.104431;
  infoData: InfoModel;

  constructor(private location: Location,private infoService: InfoService) { }

  ngOnInit() {
    this.getInfo()
  }

  goBack(): void {
    this.location.back();
  }

  getInfo(){
    this.infoService.getInfoData()
    .then(data => {
      this.infoData = data;
    })
    .catch(error => {
      console.error('Error al obtener los datos de la info:', error);
    });
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
