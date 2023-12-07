import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { CreateLocationRequest } from 'src/shared/domain/request/CreateLocation';
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
  constructor( private router: Router, 
    public formBuilder: FormBuilder,
    public shareObjectService:ShareObjectService,
    private requestUseCase: RequestUseCases,
    private userService:UserService,
    private alertController: AlertController,
    private cartService:CartService
    ) {
    this.myForm = this.formBuilder.group({
      addressInput: ['', [Validators.required,]],
      addressDetail:['', [Validators.required,]],
      condition:[]
    });
   }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    const datos = this.shareObjectService.getObjetoCompartido()
    this.data = datos;
    console.log(datos);
    this.myForm.get('addressInput')?.setValue(datos?.addressInput)
  }

  async submit(){
    const token = await this.getToken()
    const data:CreateLocationRequest = {
      address:this.myForm.get('addressInput')?.value,
      name:'ejemplo',
      latitude:this.data.latitude,
      longitude:this.data.longitude,
      detail:this.myForm.get('addressDetail')?.value,
      favorite:false
    }
    this.requestUseCase.postLocations(token,data)
      .subscribe((response) => {
        if (response.success === true) {
          this.showAlertSuccess();
          console.log(response)
        }
        else{
          this.showAlertError();
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
    let datos = { mensaje: true };
    this.router.navigate(['/home/tab3/cart-checkout',{ newAddress: datos.mensaje }]);
  }

}
