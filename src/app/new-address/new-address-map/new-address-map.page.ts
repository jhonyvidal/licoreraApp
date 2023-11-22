import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ShareObjectService } from 'src/shared/services/shareObject';

@Component({
  selector: 'app-new-address-map',
  templateUrl: './new-address-map.page.html',
  styleUrls: ['./new-address-map.page.scss'],
})
export class NewAddressMapPage implements OnInit {

  myForm: FormGroup;

  @ViewChild('map')mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  coordinates: any;
  latitude:number;
  longitude:number;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private shareObjectService: ShareObjectService
  ) {
    this.myForm = this.formBuilder.group({
      addressInput: ['', [Validators.required,]],
    });

    // this.coordinates = {coords:{ latitude:7.123952,longitude:-73.116186}}
  }

  ionViewWillEnter() {
    this.coordinates = this.shareObjectService.getObjetoCompartido();
    this.myForm.get('addressInput')?.setValue(this.coordinates?.addressInput);
    this.createMap();
  }

  ngOnInit() {
  }

  async createMap() {

    this.latitude = this.coordinates.coords.latitude;
    this.longitude = this.coordinates.coords.longitude;
    
    this.newMap = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: environment.ApiKey,
      forceCreate:true,
      config: {
        center: {
          lat: this.coordinates.coords.latitude,
          lng: this.coordinates.coords.longitude,
        },
        zoom: 17,
      },
    });

    await this.newMap.addMarker({
      coordinate: {
        lat: this.coordinates.coords.latitude,
        lng: this.coordinates.coords.longitude
      },
      draggable: true,
    });
    await this.newMap.setOnMarkerDragEndListener((event) => {
      this.latitude = event.latitude;
      this.longitude = event.longitude
    });
  }

  ngAfterViewInit() {
    this.createMap();
  }

  goToNewAddress(){
    this.router.navigate(['/new-address']);
  }

  goToConfirmAddress(){
    this.shareObjectService.setObjetoCompartido(
      {
        addressInput:this.myForm.get('addressInput')?.value, 
        latitude: this.latitude,
        longitude:this.longitude
      }
    )
    this.router.navigate(['/new-address/new-address-confirm']);
  }

}
