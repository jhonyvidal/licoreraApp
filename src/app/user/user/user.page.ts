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

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
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
  clientPoints: ClientPointsData;
  client_Id: string = '114136667852541';
  currentValue: any;
  btnStylesCSS: string = 'white';
  dataChanged: boolean = false;
  requestDataForm: UpdateClientData;
  loginToken: string;
  appInjectorRef: Injector;
  paymentMethods: any = [
    {
      cardNumber: '4513 **** **** 1234',
      starImage: this.starEmpty
    },
    {
      cardNumber: '4513 **** **** 1234',
      starImage: this.starEmpty
    },
    {
      cardNumber: '4513 **** **** 1234',
      starImage: this.starEmpty
    },
    {
      cardNumber: '4513 **** **** 1234',
      starImage: this.starEmpty
    },
  ];

  miVariableObservable: Observable<boolean>;
  paymentMethodsList: DataArray[] = [];

  addressList: any = [
    {
      name: 'Mi casa',
      address: 'Altos de Miravalle',
      starImage: this.starEmpty
    },
    {
      name: 'Casa Mamá',
      address: 'Cra 12 # 34 - 56',
      starImage: this.starEmpty
    }
  ];
  yaConsulto: boolean = false;
  loginV2Data: LoginV2Request = {
    email: "diego4@mail.com",
    password: "Diego1234"
  }
  loginV2Token: string;


  constructor(
    public formBuilder: FormBuilder,
    private requestUseCase: RequestUseCases,
    private router: Router,
    private alertController: AlertController,
    private userService: UserService
  ) {
    this.myForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, ]],
      name: ['', [Validators.required, ]],
      lastName: ['', [Validators.required, ]],
      date: [new Date('07/02/1994').toISOString().substring(0, 10), [Validators.required, ]],
      phone: ['3153103352', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {

    // Hacer el login de la nueva api v2
    this.getPaymentMethods();

    this.getClientData();

    this.requestUseCase.getClientPoints(this.client_Id).subscribe(response => {
      if (response.success === true) {

        this.clientPoints = response;

      } else {
        console.log('Body del error: ', response);
      }
    })
    this.detectChanges();
  }

  getClientData(){
    this.requestUseCase.getClient('token', this.client_Id).subscribe(response => {
      if (response.success === true) {
        this.client = response;
        this.avatarImage = this.client.data.photo ? this.client.data.photo : this.defaultAvatarImage;

        this.myForm.get('name')?.setValue(this.client.data.name);
        this.myForm.get('lastName')?.setValue(this.client.data.last_name);
        this.myForm.get('email')?.setValue(this.client.data.email);
        this.myForm.get('date')?.setValue(this.client.data.birthday);
        this.myForm.get('phone')?.setValue(this.client.data.cellphone);

      } else {
        console.log('Body del error: ', response);
      }
    })
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
      console.log(data.api_token);

      this.requestUseCase.getPaymentMethodsV2(data.api_token).subscribe(response => {
        if (response.success === true) {
          console.log('Payment methods: ', response);

          this.paymentMethodsList = response.data;
        } else {
          console.log('Body del error response: ', response);
        }
      })
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });

  }

  btnFuntion(){
    // User data logic
    if (this.ionSegment === 1 && this.btnText === 'Editar') {
      this.btnStylesCSS = '#99791C';
      setBTNColor(this.btnStylesCSS);
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
            this.getClientData();
          } else {
            console.log('Body del error: ', response);
          }
        });

      }

      this.btnStylesCSS = 'white';
      setBTNColor(this.btnStylesCSS);
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
    setBTNColor(this.btnStylesCSS);
    this.ionSegment = id;
    this.btnText = this.ionSegment === 1 ? 'Editar' : 'Agregar';
  }

  selectCard(index: number){
    for (let i = 0; i < this.paymentMethods.length; i++) {
      if (i === index) {
        this.paymentMethods[i].starImage = this.starSelected;
      }else{
        this.paymentMethods[i].starImage = this.starEmpty;
      }
    }
  }

  selectAddress(index: number){
    for (let i = 0; i < this.addressList.length; i++) {
      if (i === index) {
        this.addressList[i].starImage = this.starSelected;
      }else{
        this.addressList[i].starImage = this.starEmpty;
      }
    }
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

  goHome(){
    this.miVariableObservable
  }

  async showAlertLogout() {
    const usert_alerts = new UsertAlerts(this.router);
    await usert_alerts.presentAlertUser(
      this.alertController,
      'INFORMACIÓN',
      '¿Seguro que quieres cerrar sesión?',
      'Logout',
      undefined,
      // this.appInjectorRef
    );
  }

}
