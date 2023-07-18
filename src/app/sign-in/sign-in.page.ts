import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';

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
    private router: Router
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
      'Los datos no coinciden en nuestros registros, revísalos o crea una cuenta.'
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
            this.router.navigate(['/home']);
          }
          console.log(response);
        } else {
          console.log(response);
        }
      });
  }
}
