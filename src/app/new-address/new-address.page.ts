import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { Geolocation } from '@capacitor/geolocation';
import { ShareObjectService } from 'src/shared/services/shareObject';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],
})
export class NewAddressPage implements OnInit {

  constructor(
    private router: Router,
    private requestUseCase: RequestUseCases,
    private shareObjectService: ShareObjectService
  ) { }

  myTimeout: any;
  inputText: string;

  ngOnInit() {
  }

  currentLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.shareObjectService.setObjetoCompartido(coordinates)
    this.router.navigate(['/new-address/new-address-map']);
  };

  getLocation(params:any){
    clearTimeout(this.myTimeout);
    
    this.myTimeout = setTimeout(() => {
      console.log(params)
      this.requestUseCase.getApiLocation(params)
      .subscribe((response) => {
        if (response.success === true) {
        console.log(response)
        }
        else{
          console.log(response)
        }
      });
    }, 3000);
  }

  goToMap(){
    this.router.navigate(['/new-address/new-address-map']);
  }

}
