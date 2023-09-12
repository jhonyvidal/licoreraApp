import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { UserModel } from 'src/store/models/user-model';
import { UserService } from 'src/store/services/user.service';

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

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private requestUseCase: RequestUseCases,
    private router: Router,
    private userService: UserService
  ) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.classValid();
    });
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

  submit() {
    this.requestUseCase
      .postLogin(
        'token',
        this.myForm.get('email')?.value,
        this.myForm.get('password')?.value
      )
      .subscribe((response) => {
        if (response.success === true) {
          if(response.data === null){
            this.showAlert()
          }else{
            this.userService.login(response.data)
            this.router.navigate(['/home']);
          }
          console.log(response);
        } else {
          console.log(response);
        }
      });
  }

  async signInWithFacebook(): Promise<void> {
    const FACEBOOK_PERMISSIONS = [
      'email',
      'user_birthday',
      'user_photos',
      'user_gender',
    ];

    const result = await FacebookLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    });
    if (result?.accessToken) {
      console.log(result);
      // this.router.navigate(['/']);
    }
  }

  async signInWithGoogle() {
    let googleUser = await GoogleAuth.signIn();
    const userData:UserModel = {
      id: googleUser.id,
      name: googleUser.name,
      last_name: '',
      birthday: '',
      email: googleUser.email,
      password: '',
      social_id: '',
      photo: googleUser.imageUrl,
      cellphone: '',
      points: 0,
      uuid: googleUser.id,
      remember_token: googleUser.authentication.refreshToken || '',
      created_at: '',
      updated_at: '',
      token: googleUser.authentication.idToken,
    }
    this.userService.login(userData)
    this.router.navigate(['/home']);
  }

  routerLink(route: string) {
    this.router.navigate(['/' + route]);
  }
  
}
