import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { ClientData } from 'src/shared/domain/response/ClientResponse';
import setBTNColor from 'src/shared/BTN_Color/BTN_Color';
import { UpdateClientData } from 'src/shared/domain/request/UpdateClientData';
import { DeletePaymentMethodsRequest } from 'src/shared/domain/request/DeletePaymentRequest';
import { Router } from '@angular/router';
import { UsertAlerts } from 'src/shared/components/alert.user.component';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/store/services/user.service';
import { LocationsResponse } from 'src/shared/domain/response/LocationsResponse';
import { PaymentMethodsGetResponse } from 'src/shared/domain/response/PaymentMethodsGetResponse';
import { AddressObjectService } from 'src/shared/services/addressObject';
import { SignInObjectService } from 'src/shared/services/signInObject';
import { Keyboard } from '@capacitor/keyboard';
import setPaddingKeyboard from 'src/shared/BTN_Color/paddingKeyboard';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss','./user.page2.scss'],
})
export class UserPage implements OnInit {
  @ViewChild('avatarImg') avatarImage: string;
  myForm: FormGroup;
  readOnly: boolean = true;
  readonlyEmail: boolean = true;
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
  paymentMethodsList: any [] = [];
  loadingPM: boolean = true;
  paymentsEmpty: boolean = false;

  addressList: LocationsResponse["data"] = [];

  constructor(
    public formBuilder: FormBuilder,
    private requestUseCase: RequestUseCases,
    private router: Router,
    private alertController: AlertController,
    private userService: UserService,
    private addressObjectService:AddressObjectService,
    private signInObjectService:SignInObjectService,
    private el: ElementRef,
    private ngZone:NgZone,
    private renderer: Renderer2,
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

  ionViewDidEnter() {
    const platform = Capacitor.getPlatform();
    if(platform !== "web") {
      Keyboard.addListener('keyboardDidShow', (info) => {
        this.ngZone.run(() => {
          this.applyKeyboardStyle(info.keyboardHeight);
        });
      });
    }
  }

  handleImageError() {
    this.avatarImage = '../../../assets/icon/User-profile-pic.svg';
    console.log('Error al cargar la imagen');
    // Puedes realizar otras acciones aquí si lo deseas
  }

  private applyKeyboardStyle(keyboardHeight: number): void {
    const contentElement = this.el.nativeElement.querySelector('userContent');
    const maxHeight = window.innerHeight - (keyboardHeight + 20);
    
    this.renderer.setStyle(contentElement, 'max-height', `${maxHeight}px`);
    this.renderer.setStyle(contentElement, 'overflow-y', 'scroll');
  }

  ionViewWillEnter() {
    this.getPaymentMethods();
    this.getLocations();
    this.getUserData();
    this.getMeData();
    this.loadingPM = true;
    this.paymentsEmpty = false;
  }

  formatCreditCardNumber(input: string): string {
    let inputFormated:string = '';
    for (let i = 0; i < input.length; i++) {
      if(i === 4 || i === 8 || i === 12 ){
        inputFormated = inputFormated +' ' + input[i]
      }else{
        inputFormated = inputFormated + input[i]
      }
    }
    return inputFormated;
  }

  getUserData() {
    this.userService.getUserData()
    .then(data => {
      if(data?.api_token){
        data.token = data.api_token
      }
      this.loginToken = data.token;
      setBTNColor(this.btnStylesCSS, this.btnBorder, this.btnTextColor);

      this.getPaymentMethods();
      this.getLocations();
      this.getMeData();
      this.detectChanges();

    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      this.signInObjectService.setObjetoCompartido("/user")
      this.router.navigate(['/sign-in']);
    });
  }

  goToUserExchanges(){
    this.userService.getUserData().then(data => {
      if(data?.api_token){
        this.requestUseCase.getUserExchangeProducts(data.api_token, '1').subscribe( response => {
          if (response.success === true) {
            if (response.data.data.length > 0) {
              this.router.navigate(['/user-exchanges']);
            }
          }
        })
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
  }

  getMeData(){
    this.requestUseCase.getMe(this.loginToken)
    .subscribe((response) => {
      if (response.success === true) {
        console.log(response);
        
        this.client = response;
        this.client_Id = response.data.id;
        this.clientPoints = response.data.points;
        this.clientOrderQuantity = response.data.order_quantity;
        this.avatarImage = this.client.data.photo ? this.client.data.photo : this.defaultAvatarImage;
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
      if(data?.api_token){
        data.token = data.api_token
      }
      this.requestUseCase.getLocationsV2(data.token).subscribe(response => {
        if (response.success === true) {
          this.addressList = response.data;
          for (let i = 0; i < this.addressList?.length; i++) {
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

  // async getPaymentMethods(){
  getPaymentMethods(){
    this.userService.getUserData()
    .then(data => {
      if(data?.api_token){
        data.token = data.api_token
      }
      this.requestUseCase.getPaymentMethodsV2(data.token).subscribe(response => {
        if (response.success === true) {
          
          if (response?.data && response?.data?.cards) {
            for(var i=0;i<response.data.cards.length; i++){
              response.data.cards[i].mask = this.formatCreditCardNumber(response.data.cards[i].mask)
            }
            this.paymentMethodsList = response.data.cards;
            console.log(response.data.cards);
            
          }
          
          if (this.paymentMethodsList?.length <= 0) {
            this.paymentsEmpty = true;
            this.loadingPM = false;
          }else{
            this.loadingPM = false;
          }
          for (let i = 0; i < this.paymentMethodsList?.length; i++) {
            if (this.paymentMethodsList[i].favorite === false) {
              this.paymentMethodsList[i].starImage = this.starEmpty;
            }else{
              this.paymentMethodsList[i].starImage = this.starSelected;
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

  deletePaymentMethod(data: DeletePaymentMethodsRequest){
    const deleteJson: DeletePaymentMethodsRequest = {
      token: data.token,
      franchise: data.franchise,
      mask: data.mask,
    }
    this.userService.getUserData()
    .then(data => {    
      if(data?.api_token){
        data.token = data.api_token
      }  
      this.requestUseCase.postDeletePaymentMethods(data.token, deleteJson).subscribe(async response => {
        if (response.success === true) {
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

    if (this.ionSegment === 3) {
      this.addressObjectService.setObjetoCompartido('/user')
      this.router.navigate(['/new-address']);
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
          this.getLocations();
        } else {
          console.log('Body del error response: ', response);
        }
      })
    }else {
      this.requestUseCase.deleteFavoriteLocations(this.loginToken, idAddress).subscribe(response => {
        if (response.success === true) {
          this.addressList[index].starImage = this.starEmpty;
          this.getLocations();
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

  async showAlertDeletePaymentMethod(data: DeletePaymentMethodsRequest, cardNumber: string) {
    const usert_alerts = new UsertAlerts(this.router, this.userService, this.requestUseCase);
    await usert_alerts.presentAlertUser(
      this.alertController,
      // `${cardNumber.substring(0, 4)} **** **** ${cardNumber.substring(12, 16)}`,
      data.mask,
      '¿Seguro que quieres eliminar esta tarjeta?',
      'areYouSure',
      undefined,
      data.token,
      () => this.deletePaymentMethod(data)
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

  goToOrders(){
    this.router.navigate(['/recent-orders']);
  }

}
