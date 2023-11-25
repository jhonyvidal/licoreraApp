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

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private requestUseCase: RequestUseCases,
    private router: Router,
    private userService: UserService,
    private readonly dialogService: DialogService,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService
  ) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.firebaseAuthenticationService.getRedirectResult().then((result) => {
      if (result?.user) {
        this.getMe(result?.credential?.idToken || '');
      }
    });
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.classValid();
    });
  }

  public async signInWithGoogle(): Promise<void> {
    await this.signInWith(SignInProvider.google);
  }

  public async signInWithFacebook(): Promise<void> {
    await this.signInWith(SignInProvider.facebook);
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

  async showAlert() {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      'Los datos no coinciden en nuestros registros, revísalos o crea una cuenta.',
      '/assets/img/loginError.svg'
    );
  }

  getMe(token:string){
    this.requestUseCase.getMe(token)
    .subscribe((response) => {
      if (response.success === true) {
        this.userService.login(response.data)
        this.router.navigate(['/home']);
      }
      else{
        this.showAlert();
      }
    });
  }

  submit() {
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
        if (response.success === true) {
          if (response.data === null) {
            this.showAlert();
          } else {
            this.getMe(response.data.token)
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
      switch (provider) {
        case SignInProvider.apple:
          await this.firebaseAuthenticationService.signInWithApple();
          break;
        case SignInProvider.facebook:
          await this.firebaseAuthenticationService.signInWithFacebook();
          break;
        case SignInProvider.google:
          await this.firebaseAuthenticationService.signInWithGoogle();
          break;
        case SignInProvider.email:
          return await this.firebaseAuthenticationService.signInWithEmailAndPassword({
            email: this.myForm.get('email')?.value,
            password: this.myForm.get('password')?.value,
          });
          break;
      }
      // await this.router.navigate(['/home']);
    } finally {
      await loadingElement.dismiss();
    }
  }

  routerLink(route: string) {
    this.router.navigate(['/' + route]);
  }

  togglePasswordFieldType() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}

enum SignInProvider {
  email = 'email',
  apple = 'apple',
  facebook = 'facebook',
  google = 'google',
}
