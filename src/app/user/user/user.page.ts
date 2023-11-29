import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { ClientData } from 'src/shared/domain/response/ClientResponse';
import { ClientPointsData } from 'src/shared/domain/response/ClientPointsData';
import setBodyColor from 'src/shared/BTN_Color/BTN_Color';
import setBTNColor from 'src/shared/BTN_Color/BTN_Color';
import { UpdateClientData } from 'src/shared/domain/request/UpdateClientData';
import { LoginV2Request } from 'src/shared/domain/request/LoginV2Request';
import { DeletePaymentMethodsRequest } from 'src/shared/domain/request/DeletePaymentRequest';
import { DataArray } from 'src/shared/domain/response/PaymentMethodsGetResponse';
import { Router } from '@angular/router';
import { UsertAlerts } from 'src/shared/components/alert.user.component';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/store/services/user.service';
import { Injector } from "@angular/core";
import { Observable } from 'rxjs';
import { LocationsResponse } from 'src/shared/domain/response/LocationsResponse';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss','./user.page2.scss'],
})
export class UserPage implements OnInit {

  myForm: FormGroup;
  readOnly: boolean = true;
  avatarImage: string;
  defaultAvatarImage: string = '../../../assets/icon/User-profile-pic.svg';
  btnText: string = 'Editar';
  ionSegment:number = 1;
  starSelected: string = '../../../assets/icon/star-selected.svg';
  starEmpty: string = '../../../assets/icon/star-empty.svg';
  client: ClientData;
  clientPoints: '';
  client_Id: string = '';
  clientOrderQuantity = '';
  currentValue: any;
  btnStylesCSS: string = 'white';
  btnBorder: string = '2px solid black';
  btnTextColor: string = 'black';
  dataChanged: boolean = false;
  requestDataForm: UpdateClientData;
  loginToken: string;
  paymentMethodsList: DataArray[] = [];

  addressList: LocationsResponse["data"] = [];

  constructor(
    public formBuilder: FormBuilder,
    private requestUseCase: RequestUseCases,
    private router: Router,
    private alertController: AlertController,
    private userService: UserService
  ) {
    this.myForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      date: [new Date('07/02/1994').toISOString().substring(0, 10), [Validators.required, ]],
      phone: ['3153103352', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getPaymentMethods();
    this.getLocations();
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserData()
    .then(data => {

      this.loginToken = data.api_token;
      setBTNColor(this.btnStylesCSS, this.btnBorder, this.btnTextColor);

      this.getPaymentMethods();
      this.getLocations();
      this.getMeData();
      this.detectChanges();

    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      this.router.navigate(['/sign-in']);
    });
  }

  getMeData(){
    this.requestUseCase.getMe(this.loginToken)
    .subscribe((response) => {
      if (response.success === true) {
        this.client = response;
        this.client_Id = response.data.id;
        this.clientPoints = response.data.points;
        this.clientOrderQuantity = response.data.order_quantity;
        this.avatarImage = this.client.data.photo ? this.client.data.photo : this.defaultAvatarImage;
        console.log(response);
        

        this.myForm.get('name')?.setValue(this.client.data.name);
        this.myForm.get('lastName')?.setValue(this.client.data.last_name);
        this.myForm.get('email')?.setValue(this.client.data.email);
        this.myForm.get('date')?.setValue(this.client.data.birthday);
        this.myForm.get('phone')?.setValue(this.client.data.cellphone);

      } else {
        console.log('Body del error: ', response);
      }
      
    });
  }

  getLocations() {
    this.userService.getUserData()
    .then(data => {
      this.requestUseCase.getLocationsV2(data.api_token).subscribe(response => {
        if (response.success === true) {
          this.addressList = response.data;
          for (let i = 0; i < this.addressList.length; i++) {
            if (this.addressList[i].favorite === false) {
              this.addressList[i].starImage = this.starEmpty;
            }else{
              this.addressList[i].starImage = this.starSelected;
            }
          }
        } else {
          console.log('Body del error response: ', response);
        }
      })
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
  }

  detectChanges() {
    // Fires on each form control value change
    this.myForm.valueChanges.subscribe(res => {
      this.currentValue = res;
    });

    this.dataChanged = false;
  }

  async getPaymentMethods(){
    this.userService.getUserData()
    .then(data => {
      this.requestUseCase.getPaymentMethodsV2(data.api_token).subscribe(response => {
        if (response.success === true) {
          this.paymentMethodsList = response.data;
          console.log('PaymentMethods: ', response.data);
          
          // for (let i = 0; i < this.paymentMethodsList.length; i++) {
          //   if (this.paymentMethodsList[i].favorite === 0) {
          //     this.star = this.starEmpty;
          //   }else{
          //     this.star = this.starEmpty;
          //   }
          // }
        } else {
          console.log('Body del error response: ', response);
        }
      })
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });

  }

  deletePaymentMethod(id: number){
    const deleteJson: DeletePaymentMethodsRequest = {
      'id': id
    }
    this.userService.getUserData()
    .then(data => {      
      this.requestUseCase.postDeletePaymentMethods(data.api_token, deleteJson).subscribe(async response => {
        if (response.success === true) {
          console.log(`Payment method ${id} was deleted...`);
          this.getPaymentMethods();
        } else {
          console.log('Body del error response: ', response);
        }
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });

  }

  deleteAddress(idAddress: string){
        
    this.requestUseCase.deleteAddress(this.loginToken, idAddress).subscribe(async response => {
      if (response.success === true) {
        console.log(`Address ${idAddress} was deleted...`);
        this.getLocations();
      } else {
        console.log('Body del error response: ', response);
      }
    });

  }

  btnFuntion(){
    // User data logic
    if (this.ionSegment === 1 && this.btnText === 'Editar') {
      this.btnStylesCSS = '#99791C';
      this.btnBorder = 'none';
      this.btnTextColor = 'white';
      setBTNColor(this.btnStylesCSS, this.btnBorder, this.btnTextColor);
      this.btnText = 'Guardar';
      this.readOnly = false;
    }else if (this.ionSegment === 1 && this.btnText === 'Guardar') {

      if (this.client.data.name != this.myForm.get('name')?.value ||
          this.client.data.last_name != this.myForm.get('lastName')?.value ||
          this.client.data.email != this.myForm.get('email')?.value ||
          this.client.data.birthday != this.myForm.get('date')?.value ||
          this.client.data.cellphone != this.myForm.get('phone')?.value) {

        this.requestDataForm = {
          name: this.myForm.get('name')?.value,
          last_name: this.myForm.get('lastName')?.value,
          email: this.myForm.get('email')?.value,
          birthday: this.myForm.get('date')?.value,
          cellphone: this.myForm.get('phone')?.value
        }

        this.requestUseCase.putClient(this.client_Id, this.requestDataForm).subscribe(response => {
          if (response.success === true) {
            console.log('client updated...');
            this.getMeData();
          } else {
            console.log('Body del error: ', response);
          }
        });

      }

      this.btnStylesCSS = 'white';
      this.btnBorder = '2px solid black';
      this.btnTextColor = 'black';
      setBTNColor(this.btnStylesCSS, this.btnBorder, this.btnTextColor);
      this.btnText = 'Editar';
      this.readOnly = true;
    }

    // Payment methods logic
    if (this.ionSegment === 2) {
      this.router.navigate(['/credit-card']);
    }
  }

  show(id:number){
    this.btnStylesCSS = 'white';
    this.btnBorder = '2px solid black';
    this.btnTextColor = 'black';
    setBTNColor(this.btnStylesCSS, this.btnBorder, this.btnTextColor);
    this.ionSegment = id;
    this.btnText = this.ionSegment === 1 ? 'Editar' : 'Agregar';
  }

  selectCard(index: number){
    
  }

  selectAddress(idAddress: number, favorite: boolean, index: number){
    let body = {
      id: idAddress,
    }

    if (!favorite) {
      this.requestUseCase.postFavoriteLocations(this.loginToken, body).subscribe(response => {
        if (response.success === true) {
          this.addressList[index].starImage = this.starSelected;
        } else {
          console.log('Body del error response: ', response);
        }
      })
    }else {
      this.requestUseCase.deleteFavoriteLocations(this.loginToken, body).subscribe(response => {
        if (response.success === true) {
          this.addressList[index].starImage = this.starEmpty;
        } else {
          console.log('Body del error response: ', response);
        }
      })
    }
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  // Alerts
  async showAlertLogout() {
    const usert_alerts = new UsertAlerts(this.router, this.userService, this.requestUseCase);
    await usert_alerts.presentAlertUser(
      this.alertController,
      'INFORMACIÓN',
      '¿Seguro que quieres cerrar sesión?',
      'logout',
      undefined,
    );
  }

  async showAlertDeletePaymentMethod(id: number, cardNumber: string) {
    const usert_alerts = new UsertAlerts(this.router, this.userService, this.requestUseCase);
    await usert_alerts.presentAlertUser(
      this.alertController,
      `${cardNumber.substring(0, 4)} **** **** ${cardNumber.substring(12, 16)}`,
      '¿Seguro que quieres eliminar esta tarjeta?',
      'areYouSure',
      undefined,
      id,
      () => this.deletePaymentMethod(id)
    );
  }

  async showAlertDeleteAddress(idAddress: string, name: string) {
    const usert_alerts = new UsertAlerts(this.router, this.userService, this.requestUseCase);
    await usert_alerts.presentAlertUser(
      this.alertController,
      name,
      '¿Seguro que quieres eliminar esta dirección?',
      'areYouSure',
      undefined,
      idAddress,
      () => this.deleteAddress(idAddress)
    );
  }

}
