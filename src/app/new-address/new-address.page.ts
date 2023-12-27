import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { Geolocation } from '@capacitor/geolocation';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { UserService } from 'src/store/services/user.service';
import { animation } from '@angular/animations';
import { Location } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { CartService } from 'src/store/services/cart.service';
import { Subscription } from 'rxjs';
import { AddressObjectService } from 'src/shared/services/addressObject';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],
})
export class NewAddressPage implements OnInit {
  
  private subscription: Subscription;
  fromAddress: string;

  constructor(
    private router: Router,
    private requestUseCase: RequestUseCases,
    private shareObjectService: ShareObjectService,
    private userService:UserService,
    private location: Location,
    private ngZone: NgZone,
    private el: ElementRef,
    private renderer: Renderer2,
    private cartService:CartService,
    private addressObjectService:AddressObjectService
  ) { 
    const platform = Capacitor.getPlatform();
      if(platform !== "web") {
        Keyboard.addListener('keyboardWillShow', (info) => {
          this.ngZone.run(() => {
            this.applyKeyboardStyle(info.keyboardHeight);
          });
        });
      }
  }

  myTimeout: any;
  inputText: string;
  googleAddress: []
  navigating = false;
  

  ngOnInit() {
     // ONLY WEB TEST
    // setTimeout(() => {
    //   this.applyKeyboardStyleWeb(450);
    // }, 1000);
  }

  private applyKeyboardStyle(keyboardHeight: number): void {
    const contentElement = this.el.nativeElement.querySelector('mainContent');
    const maxHeight = window.innerHeight - keyboardHeight;
    console.log(maxHeight, contentElement);
    
    this.renderer.setStyle(contentElement, 'max-height', `${maxHeight}px`);
    this.renderer.setStyle(contentElement, 'overflow-y', 'scroll');
  }

  // ONLY WEB TEST
  // private applyKeyboardStyleWeb(keyboardHeight: number): void {
  //   // Obtener todos los elementos con la clase 'mainContent'
  //   const contentElements = document.getElementsByClassName('mainContent') as HTMLCollectionOf<HTMLElement>;
  //   // Verificar si hay elementos
  //   if (contentElements.length > 0) {
  //     // Obtener el primer elemento con la clase 'mainContent'
  //     const contentElement = contentElements[0];
  //     // Calcular la altura máxima
  //     const maxHeight = window.innerHeight - keyboardHeight;
  //     // Utilizar 'style' en el elemento específico
  //     contentElement.style.maxHeight = `${maxHeight}px`;
  //     contentElement.style.overflowY = 'scroll';
  //   } else {
  //     console.error('No se encontraron elementos con la clase "mainContent".');
  //   }
  // }

  currentLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.shareObjectService.setObjetoCompartido(coordinates)
    this.navigating = true;
    setTimeout(() => {
      this.router.navigate(['/new-address/new-address-map'])
      .then(() => {
        this.navigating = false;
      });
    }, 100);
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
    }, 600);
  }

  clickAdress(address:any){
    this.navigating = true;
    const newAddress = {
      coords:{
        latitude:address.geometry.location.lat,
        longitude:address.geometry.location.lng
      },
      addressInput: address.formatted_address 
    }
    this.shareObjectService.setObjetoCompartido(newAddress);
    setTimeout(() => {
      this.router.navigate(['/new-address/new-address-map'])
      .then(() => {
        this.navigating = false;
      });
    }, 100);
   
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
    const newAddress = {
      coords:{
        latitude:7.068565,
        longitude:-73.1070059
      },
      addressInput: '3V9W+C6G Floridablanca, Santander' 
    }
    this.shareObjectService.setObjetoCompartido(newAddress);
    this.navigating = true;
    setTimeout(() => {
      this.router.navigate(['/new-address/new-address-map'])
      .then(() => {
        this.navigating = false;
      });
    }, 100);
   
  }

  goBack(): void {
    const address = this.addressObjectService.getObjetoCompartido()
    this.router.navigate([address]);
  }

}
