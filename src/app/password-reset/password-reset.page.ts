import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
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
      'Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.'
    );
  }

  submit() {
    this.requestUseCase
      .postForgotPassword(
        'token',
        this.myForm.get('email')?.value
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
          this.showAlert()
          console.log(response);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/sign-in']);
  }
}
