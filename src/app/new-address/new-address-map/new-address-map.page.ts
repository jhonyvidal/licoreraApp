import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { HttpClient } from '@angular/common/http';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UserService } from 'src/store/services/user.service';

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
  latitude:number = 7.068565;
  longitude:number = -73.1070059;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private shareObjectService: ShareObjectService,
    private requestUseCase: RequestUseCases,
    private userService:UserService
  ) {
    this.myForm = this.formBuilder.group({
      addressInput: ['', [Validators.required,]],
    });
    // this.coordinates = {coords:{ latitude:7.123952,longitude:-73.116186}}
  }

  async ionViewWillEnter() {
    this.coordinates = await this.shareObjectService.getObjetoCompartido();
    this.myForm.get('addressInput')?.setValue(this.coordinates?.addressInput);
    this.createMap(this.coordinates);
  }

  ngOnInit() {
  }

  async createMap(coordinate?:any) {
    if(coordinate?.coords?.latitude && coordinate?.coords?.longitude){
      console.log(this.coordinates);
      this.latitude = coordinate.coords.latitude;
      this.longitude = coordinate.coords.longitude;
    }
    
    this.newMap = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: environment.ApiKey,
      forceCreate:true,
      config: {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 12,
      },
    });

    await this.newMap.addMarker({
      iconUrl:'../../assets/icon/locationIcon.png',
      coordinate: {
        lat: this.latitude,
        lng:  this.longitude
      },
      draggable: true,
    });

    await this.newMap.setOnMarkerDragEndListener(async (event) => {
      this.latitude = event.latitude;
      this.longitude = event.longitude;
      // Obtener la dirección/nomenclatura
      this.getGoogleReverseApi(event.latitude,event.longitude)
    });
  }

  


  async getGoogleReverseApi(latitud:number,longitude:number){
    await this.newMap.setCamera({
      coordinate: {
        lat: latitud,
        lng: longitude
      }
    });
    const token = await this.getToken()
      this.requestUseCase.getGoogleReverseApi(token,latitud,longitude)
      .subscribe((response) => {
        if (response.success === true) {
          this.myForm.get('addressInput')?.setValue(response.data.results[0].formatted_address);
          this.latitude = response.data.results[0].geometry.location.lat
          this.longitude = response.data.results[0].geometry.location.lng
          console.log(response.data.results)
        }
        else{
          console.log(response)
        }
      });

  }

  getToken() {
    const response = this.userService.getUserData()
    .then(data => {
      console.log('Api token: ', data.api_token);
      return data.api_token
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      return 'asdasd'
    });
    return response;
  }

  // ngAfterViewInit() {
  //   this.createMap();
  // }

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
