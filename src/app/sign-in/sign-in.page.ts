import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { UserModel } from 'src/store/models/user-model';
import { UserService } from 'src/store/services/user.service';
import { DialogService, FirebaseAuthenticationService } from '../core';
import { User } from '@capacitor-firebase/authentication';
import { LoginV2Request } from 'src/shared/domain/request/LoginV2Request';
import { catchError, throwError } from 'rxjs';
import { SignInObjectService } from 'src/shared/services/signInObject';
import { PresentLoaderComponent } from 'src/shared/Loader/PresentLoaderComponent';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  myForm: FormGroup;
  isFormValid = false;
  buttonStyle = 'DisableButton';
  public activeOpen = '';
  public activeClose = '';
  currentUser: User | null;
  idToken: string;
  passwordFieldType:string = 'password';
  iconShowPassword:string = '../../assets/icon/show-password.svg';

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private requestUseCase: RequestUseCases,
    private router: Router,
    private userService: UserService,
    private readonly dialogService: DialogService,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private signInObjectService:SignInObjectService,
    private presentLoaderComponent:PresentLoaderComponent
  ) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.checkAuthState();
    this.firebaseAuthenticationService.getRedirectResult()
    .then((result) => {
      console.log("redirect Result", result);
      if (result?.user) {
        this.getMe(result?.credential?.idToken || '');
      }
    });
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.classValid();
    });
  }

  async checkAuthState(): Promise<void> {
    const user = await this.firebaseAuthenticationService.getCurrentUser();

    if (user) {
      const token = await this.firebaseAuthenticationService.getIdToken();
      this.getMe(token);
    } else {
      console.log('No user is currently logged in');
    }
  }

  public async signInWithGoogle(): Promise<void> {
    try {
      // Inicia sesión con Google
      const result = await this.signInWith(SignInProvider.google);
  
      if (result) {
        console.log("Resultado de Google:", result);
        
        // Obtén el token de autenticación si el login fue exitoso
        const token = await this.firebaseAuthenticationService.getIdToken();
        
        if (token) {
          // Llama a la función getMe para procesar el token
          this.getMe(token);
        } else {
          console.error("No se pudo obtener el token.");
          // Muestra un mensaje de error al usuario si no hay token
          this.showAlertLogin("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.");
        }
      } else {
        // Si el resultado es nulo o vacío, muestra un mensaje de error
        console.error("El inicio de sesión con Google falló.");
        this.showAlertLogin("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.");
      }
  
    } catch (error) {
      // Captura cualquier error que ocurra durante el proceso
      console.error("Error durante el inicio de sesión con Google:", error);
      this.showAlertLogin("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.");
    }
  
    // Este console.log solo se ejecutará si no hay errores en el proceso
    console.log("Resultado final de Google login.");
  }
  
  public async signInWithFacebook(): Promise<void> {
    try {
      // Inicia sesión con Facebook
      const result = await this.signInWith(SignInProvider.facebook);
  
      if (result) {
        console.log("Resultado de Facebook:", result);
        
        // Obtén el token de autenticación si el login fue exitoso
        const token = await this.firebaseAuthenticationService.getIdToken();
        
        if (token) {
          // Llama a la función getMe para procesar el token
          this.getMe(token);
        } else {
          console.error("No se pudo obtener el token.");
          // Muestra un mensaje de error al usuario si no hay token
          this.showAlertLogin("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.");
        }
      } else {
        // Si el resultado es nulo o vacío, muestra un mensaje de error
        console.error("El inicio de sesión con Facebook falló.");
        this.showAlertLogin("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.");
      }
      
    } catch (error) {
      // Captura cualquier error que ocurra durante el proceso
      console.error("Error durante el inicio de sesión con Facebook:", error);
      this.showAlertLogin("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.");
    }
  
    // Este console.log solo se ejecutará si no hay errores en el proceso
    console.log("Resultado final de Facebook login.");
  }

  public async signInWithEmail(): Promise<void> {
    var result = await this.signInWith(SignInProvider.email);
    if (result.user) {
      const token = await this.firebaseAuthenticationService.getIdToken()
      this.getMe(token);
    }
  }

  classValid() {
    if (this.myForm.valid) {
      this.buttonStyle = 'Activebutton';
    } else {
      this.buttonStyle = 'DisableButton';
    }
  }

  async showAlertLogin(text:string) {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      text,
      '/assets/img/loginError.svg'
    );
  }

  async showAlert() {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      'Los datos no coinciden en nuestros registros, revísalos o crea una cuenta.',
      '/assets/img/loginError.svg'
    );
  }

  getMe(token:string, refresh_token? :string){
    this.requestUseCase.getMe(token)
    .subscribe((response) => {
      console.log('Response getMe: ', response);
      
      if (response.success === true) {
        response.data.api_token = token;
        this.userService.login(response.data, refresh_token)
        if (!response.data.birthday || !response.data.cellphone || !response.data.docNumber ||
            response.data.birthday === null || response.data.cellphone === null || response.data.docNumber === null
        ) {
          this.router.navigate(['/missing-info']);
        }else{
          this.router.navigate(['/home']);
        }
      }
      else{
        this.showAlert();
      }
    });
  }

  submit() {
    this.presentLoaderComponent.showHandleLoading()
    const data:LoginV2Request={
      email:this.myForm.get('email')?.value,
      password:this.myForm.get('password')?.value
    }
    this.requestUseCase
      .postLoginV2(
        data
      )
      .pipe(
        catchError((error) => {
          console.error('Error en la suscripción:', error);
          this.showAlert();
          return throwError(error); 
        })
      )
      .subscribe((response) => {
        this.presentLoaderComponent.hideHandleLoading()
        if (response.success === true) {
          if (response.data === null) {
            this.showAlert();
          } else {
            this.getMe(response.data.token, response.data.refresh_token)
          }
          console.log('this:',response);
        } else {
          this.showAlert();
        }
      });
  }

  // async signInWithFacebook(): Promise<void> {
  //   const FACEBOOK_PERMISSIONS = [
  //     'email',
  //     'user_birthday',
  //     'user_photos',
  //     'user_gender',
  //   ];

  //   const result = await FacebookLogin.login({
  //     permissions: FACEBOOK_PERMISSIONS,
  //   });
  //   if (result?.accessToken) {
  //     console.log(result);
  //     // this.router.navigate(['/']);
  //   }
  // }

  // async signInWithGoogle() {
  //   let googleUser = await GoogleAuth.signIn();
  //   const userData:UserModel = {
  //     id: googleUser.id,
  //     name: googleUser.name,
  //     last_name: '',
  //     birthday: '',
  //     email: googleUser.email,
  //     password: '',
  //     social_id: '',
  //     photo: googleUser.imageUrl,
  //     cellphone: '',
  //     points: 0,
  //     uuid: googleUser.id,
  //     remember_token: googleUser.authentication.refreshToken || '',
  //     created_at: '',
  //     updated_at: '',
  //     token: googleUser.authentication.idToken,
  //   }
  //   this.userService.login(userData)
  //   this.router.navigate(['/home']);
  // }

  private async signInWith(provider: SignInProvider): Promise<any> {
    const loadingElement = await this.dialogService.showLoading();
    try {
      console.log('provider', provider);      
      switch (provider) {
        case SignInProvider.apple:
          await this.firebaseAuthenticationService.signInWithApple();
          break;
        case SignInProvider.facebook:
          return await this.firebaseAuthenticationService.signInWithFacebook();
          break;
        case SignInProvider.google:
          return await this.firebaseAuthenticationService.signInWithGoogle();
          break;
        case SignInProvider.email:
          return await this.firebaseAuthenticationService.signInWithEmailAndPassword({
            email: this.myForm.get('email')?.value,
            password: this.myForm.get('password')?.value,
          });
          break;
      }
      //await this.router.navigate(['/home']);
    }catch(error){
      console.log('Error in sign-in: ', error);
      
    }finally {
      await loadingElement.dismiss();
    }
  }

  routerLink(route: string) {
    this.router.navigate(['/' + route]);
  }

  togglePasswordFieldType() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.iconShowPassword = this.iconShowPassword === '../../assets/icon/show-password.svg' ? '../../assets/icon/hide-password.svg':'../../assets/icon/show-password.svg'
  }

  goBack(): void {
    const backRouter = this.signInObjectService.getObjetoCompartido()
    // this.router.navigate([backRouter]);
    this.router.navigate(['/home']);
  }

}

enum SignInProvider {
  email = 'email',
  apple = 'apple',
  facebook = 'facebook',
  google = 'google',
}
