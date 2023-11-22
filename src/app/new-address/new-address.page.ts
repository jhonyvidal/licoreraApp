import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { Geolocation } from '@capacitor/geolocation';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],
})
export class NewAddressPage implements OnInit {

  constructor(
    private router: Router,
    private requestUseCase: RequestUseCases,
    private shareObjectService: ShareObjectService,
    private userService:UserService,
  ) { }

  myTimeout: any;
  inputText: string;
  googleAddress: []

  ngOnInit() {
  }

  currentLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.shareObjectService.setObjetoCompartido(coordinates)
    this.router.navigate(['/new-address/new-address-map']);
  };

  async getLocation(params:any){
    params = params.replace(/ /g, '+');
    params = params.replace('#', '');
    params = encodeURIComponent(params);
    clearTimeout(this.myTimeout);
    const token = await this.getToken()
    this.myTimeout = setTimeout(() => {
      console.log(params)
      this.requestUseCase.getGoogleApi(token,params)
      .subscribe((response) => {
        if (response.success === true) {
          this.googleAddress = response.data.results;
          console.log(response.data.results)
        }
        else{
          console.log(response)
        }
      });
    }, 3000);
  }

  clickAdress(address:any){
    const newAddress = {
      coords:{
        latitude:address.geometry.location.lat,
        longitude:address.geometry.location.lng
      },
      addressInput: address.formatted_address 
    }
    this.shareObjectService.setObjetoCompartido(newAddress);
    this.router.navigate(['/new-address/new-address-map']);
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

  goToMap(){
    this.router.navigate(['/new-address/new-address-map']);
  }

}
