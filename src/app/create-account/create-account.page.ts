import { Component, OnInit } from '@angular/core';
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
    private infoService: InfoService
    ) {
      this.myForm = this.formBuilder.group({
        name: ['', [Validators.required, ]],
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
  }

  convertDateFormat(dateString: string): string {
    const dateParts = dateString.split('-'); // Separar los componentes de la fecha
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}/${month}/${year}`; // Construir la fecha en formato DD/MM/AAAA
  }

  async showAlertError() {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      'Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.',
      '/assets/img/warning.svg'
    );
  }

  async showAlertSuccess() {
    await presentAlert(
      this.alertController,
      '¡FELICITACIONES!',
      'Tu cuenta se ha creado exitosamente. Ahora puedes empezar a hacer pedidos y acumular puntos.',
      '/assets/img/checkGreen.svg',
      '',
      () => this.goBack()
    );
  }

  async submit() {
    const data: CreateAccountRequest={
      id:  this.myForm.get('document')?.value,
      name: this.myForm.get('name')?.value,
      last_name: this.myForm.get('lastName')?.value,
      email:  this.myForm.get('email')?.value,
      password:  this.myForm.get('password')?.value,
      uuid:  this.myForm.get('email')?.value,
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
        .subscribe((response) => {
          if (response.success === true) {
            if(response.data === null){
              this.showAlertError()
            }else{
              this.showAlertSuccess();
              // this.router.navigate(['/home']);
            }
            console.log(response);
          } else {
            this.showAlertError()
            console.log(response);
          }
        });
      }
     
    })
    .catch(async (err)=>{
      this.showAlertError()
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
}
