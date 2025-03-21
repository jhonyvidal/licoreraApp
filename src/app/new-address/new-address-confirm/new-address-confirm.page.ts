import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { CreateLocationRequest } from 'src/shared/domain/request/CreateLocation';
import { AddressObjectService } from 'src/shared/services/addressObject';
import { ObserveObjectService } from 'src/shared/services/observeObject';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { Address, cartModel } from 'src/store/models/cart.model';
import { CartService } from 'src/store/services/cart.service';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-new-address-confirm',
  templateUrl: './new-address-confirm.page.html',
  styleUrls: ['./new-address-confirm.page.scss'],
})
export class NewAddressConfirmPage implements OnInit {
  myForm: FormGroup;
  data:any;
  isCheckboxChecked:boolean = false;
  constructor( private router: Router, 
    public formBuilder: FormBuilder,
    public shareObjectService:ShareObjectService,
    private requestUseCase: RequestUseCases,
    private userService:UserService,
    private alertController: AlertController,
    private cartService:CartService,
    private observeObjectService:ObserveObjectService,
    private addressObjectService:AddressObjectService
    ) {
    this.myForm = this.formBuilder.group({
      addressInput: ['', [Validators.required,]],
      addressName:['', []],
      addressDetail:['', [Validators.required,]],
      condition:[]
    });
   }

   showAlert = false;
   alertTitle = '';
   alertText = '';
   alertImg = '';
   alertTime = '';
   alertType = '';
 
  handleDismiss() {
     this.showAlert = false;
  }
 
  handleAccept() {
     this.goCheckOut()
  }
 
  presentCustomAlert() {
    this.alertTitle = '¡FELICITACIONES!';
    this.alertText = 'La dirección fue agregada exitosamente.';
    this.alertImg = '/assets/img/checkGreen.svg';
    this.alertTime = '';
    this.alertType = '';
    this.showAlert = true;
  }

  ngOnInit() {
    this.myForm.get('condition')?.valueChanges.subscribe(value => {
      this.isCheckboxChecked = value;
    });
  }

  ionViewWillEnter() {
    const datos = this.shareObjectService.getObjetoCompartido()
    this.data = datos;
    console.log(datos);
    this.myForm.get('addressInput')?.setValue(datos?.addressInput)
  }

  async submit(){
    if(this.isCheckboxChecked){
      const token = await this.getToken()
      const data:CreateLocationRequest = {
        address:this.myForm.get('addressInput')?.value,
        name:this.myForm.get('addressName')?.value,
        latitude:this.data.latitude,
        longitude:this.data.longitude,
        detail:this.myForm.get('addressDetail')?.value,
        favorite:false
      }
      this.requestUseCase.postLocations(token,data)
      .subscribe((response) => {
        if (response.success === true) {
          console.log(response)
          this.presentCustomAlert();   
        }
        else{
          this.showAlertError();
          console.log(response)
        }
      });
    }else{
      this.presentCustomAlert();
    }
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
  
  async showAlertSuccess() {
    await presentAlert(
      this.alertController,
      '¡FELICITACIONES!',
      'La dirección fue agregada exitosamente.',
      '/assets/img/checkGreen.svg',
      '',
      () => this.goCheckOut()
    );
  }

  async showAlertError() {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      'Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.',
      '/assets/img/warning.svg'
    );
  }
  
  goToNewAddressMap(){
    this.router.navigate(['/new-address/new-address-map']);
  }
  async goCheckOut(){
    const address:Address =   {
      address:this.myForm.get('addressInput')?.value,
      latitude:this.data.latitude,
      longitude:this.data.longitude,
      details:this.myForm.get('addressDetail')?.value,
    }
    this.cartService.setAddressCartData(address)
    this.observeObjectService.setObjetoCompartido('isPaymentSelected')
    //let datos = { mensaje: true };
    const addressUrl = this.addressObjectService.getObjetoCompartido()
    this.router.navigate([addressUrl]);
  }

}
