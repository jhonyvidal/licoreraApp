import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { CreateAccountRequest } from 'src/shared/domain/request/createAccount';
import { UserService } from 'src/store/services/user.service';
import { FirebaseAuthenticationService } from '../core';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { dateMask, phoneMask } from 'src/shared/mask/mask';
import { InfoService } from 'src/store/services/info.service';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { PresentLoaderComponent } from 'src/shared/Loader/PresentLoaderComponent';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
 
  myForm: FormGroup;
  isFormValid = false;
  buttonStyle = 'DisableButton';
  passwordFieldType:string = 'password';
  passwordFieldType2:string = 'password';
  iconShowPassword:string ='../../assets/icon/show-password.svg';
  iconShowPassword2:string = '../../assets/icon/show-password.svg';
  contentForm:string = 'contentFormLarge';
  public activeOpen = '';
  public activeClose = '';
  public keyboardHeight: number = 0;
  modalDateTime = false;
  readonly dateMask: MaskitoOptions = dateMask;
  readonly phoneMask: MaskitoOptions = phoneMask;
  
  
  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private requestUseCase: RequestUseCases,
    private router: Router,
    private userService: UserService,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private infoService: InfoService,
    private ngZone: NgZone,
    private el: ElementRef,
    private renderer: Renderer2,
    private presentLoader:PresentLoaderComponent,
    ) {
      const platform = Capacitor.getPlatform();
      if(platform !== "web") {
        setTimeout(() => {
          this.applyStyle();
        }, 500);
        Keyboard.addListener('keyboardWillShow', (info) => {
          this.ngZone.run(() => {
            this.applyKeyboardStyle(info.keyboardHeight);
          });
        });
      }

      this.myForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required, ]],
        document: ['', [Validators.required, ]],
        date: ['', [Validators.required,Validators.minLength(10) ]],
        phone: ['', [Validators.required, Validators.minLength(12)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirPassword: ['', [Validators.required, Validators.minLength(6)]],
        dateModal: ['', []],
      });
      this.myForm.setValidators(this.passwordMatchValidator);
      this.myForm.get('dateModal')?.valueChanges.subscribe(value => {
        this.myForm.patchValue({
          date: this.convertDateFormat(this.myForm.get('dateModal')?.value.split('T')[0])
        });
      });
    }

    private applyKeyboardStyle(keyboardHeight: number): void {
      const contentElement = this.el.nativeElement.querySelector('contentFormLarge');
      const maxHeight = window.innerHeight - keyboardHeight;
      this.renderer.setStyle(contentElement, 'max-height', `${maxHeight}px`);
      this.renderer.setStyle(contentElement, 'overflow-y', 'scroll');
    }

    private applyStyle(): void {
      const contentElement = this.el.nativeElement.querySelector('contentFormLarge');
      const maxHeight = window.innerHeight - 105;
      this.renderer.setStyle(contentElement, 'height', `${maxHeight}px`);
      this.renderer.setStyle(contentElement, 'overflow-y', 'scroll');
    }
    
    readonly maskPredicate: MaskitoElementPredicateAsync = async (el:any) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.classValid();
    });
    this.infoService.getInfoData()
    .then(data => {
      if(data.height > 700){
        this.contentForm = 'contentFormLarge'
      }
      else if(data.height > 600){
        this.contentForm = 'contentFormSmall'
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos de la info:', error);
    });
  }

  classValid() {
    if (this.myForm.valid) {
      this.buttonStyle = 'Activebutton';
    } else {
      this.buttonStyle = 'DisableButton';
    }
  }

  modalDate(){
    this.modalDateTime = true;
    console.log("click aqui")
  }

  convertDateFormat(dateString: string): string {
    console.log('fecha',dateString);
    
    const dateParts = dateString.split('-'); 
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}-${month}-${year}`; 
  }

  async showAlertError(data:string) {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      data,
      '/assets/img/warning.svg'
    );
  }

  async showAlertSuccess(data:any, refreshToken:string) {
    await presentAlert(
      this.alertController,
      '¡FELICITACIONES!',
      'Tu cuenta se ha creado exitosamente. Ahora puedes empezar a hacer pedidos y acumular puntos.',
      '/assets/img/checkGreen.svg',
      '',
      () => this.goHome(data,refreshToken)
    );
  }

  async submit() {
    await this.presentLoader.showHandleLoading();
    const data: CreateAccountRequest={
      id:  this.myForm.get('document')?.value,
      name: this.myForm.get('name')?.value,
      last_name: this.myForm.get('lastName')?.value,
      email:  this.myForm.get('email')?.value,
      password:  this.myForm.get('password')?.value,
      uuid:  '',
      birthday:  this.myForm.get('date')?.value,
      cellphone:  this.myForm.get('phone')?.value.replace(/ /g, ""),
      social_id: 3
    }
    await this.firebaseAuthenticationService.CreateAccountEmailAndPassword({
        email:  this.myForm.get('email')?.value,
        password:  this.myForm.get('password')?.value,
    })
    .then(async (ret) => {
      if(ret){
        this.requestUseCase
        .postCreateAccount(
          'token',
          data
        )
        .subscribe(async (response) => {
          await this.presentLoader.hideHandleLoading();
          if (response.success === true) {
            if(response.data === null){
                this.showAlertError('Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.')
            }else{
              this.showAlertSuccess(response.data, response.data.refresh_token);
              // this.router.navigate(['/home']);
            }
            console.log(response);
          } else {
            if(response.message){
              this.showAlertError(response.message)
            }else{
              this.showAlertError('Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.')
            }
            console.log(response);
          }
        });
      }
    })
    .catch(async (err)=>{
      await this.presentLoader.hideHandleLoading();
      if (err.code === 'auth/email-already-in-use') {
        this.showAlertError('El Correo ya existe, intenta usar uno nuevo.');
      } else {
        this.showAlertError(
          'Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.'
        );
      }
    }) 
    
  }
    // Función de validación personalizada
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const password = control.get('password');
      const confirmPassword = control.get('confirPassword');
      if (password?.value !== confirmPassword?.value) {
        return { 'passwordMismatch': true };
      }
      return null;
  }

  togglePasswordFieldType() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.iconShowPassword = this.iconShowPassword === '../../assets/icon/show-password.svg' ? '../../assets/icon/hide-password.svg':'../../assets/icon/show-password.svg'
  }
  togglePasswordFieldType2() {
    this.passwordFieldType2 = this.passwordFieldType2 === 'password' ? 'text' : 'password';
    this.iconShowPassword2 = this.iconShowPassword2 === '../../assets/icon/show-password.svg' ? '../../assets/icon/hide-password.svg':'../../assets/icon/show-password.svg'
  }

  goBack(): void {
    this.router.navigate(['/sign-in']);
  }

  goHome(data:any, refreshToken:string):void{
    this.userService.login(data, refreshToken)
    this.router.navigate(['/home']);
  }
}
