import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { CreateAccountRequest } from 'src/shared/domain/request/createAccount';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
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
      name: ['', [Validators.required, ]],
      lastName: ['', [Validators.required, ]],
      document: ['', [Validators.required, ]],
      date: ['', [Validators.required, ]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, ]],
      confirPassword: ['', []],
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

  submit() {
    const data: CreateAccountRequest={
      id:  this.myForm.get('document')?.value,
      name: this.myForm.get('name')?.value,
      last_name: this.myForm.get('lastName')?.value,
      email:  this.myForm.get('email')?.value,
      password:  this.myForm.get('password')?.value,
      uuid:  this.myForm.get('email')?.value,
      birthday:  this.myForm.get('date')?.value,
      cellphone:  this.myForm.get('phone')?.value,
      social_id: 3
    }
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

  goBack(): void {
    this.router.navigate(['/sign-in']);
  }
}
