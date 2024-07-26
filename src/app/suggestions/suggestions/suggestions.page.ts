import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { presentAlertExchange } from 'src/shared/components/alert.exchange.component';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {

  myForm: FormGroup;
  isFormValid = false;
  buttonStyle = 'DisableButton';
  suggested: boolean = true;

  constructor(
    private location: Location,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private requestUseCase: RequestUseCases,
    private router: Router,
  ){
    this.myForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      suggest: ['', [Validators.required]],
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

  goBack(): void {
    this.location.back();
  }

  async showAlertBad() {
    await presentAlertExchange(
      this.alertController,
      'INFORMACIÓN',
      'Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.',
      'exchange-products-bad'
    );
  }

  redirectToHome(id:number){
    this.router.navigate(['/home'])
  } 

  async showAlertSuccess() {
    await presentAlertExchange(
      this.alertController,
      '¡felicitaciones!',
      'Tu sugerencia ha sido enviada exitosamente y la atenderemos muy pronto. Trabajamos para mejorar.',
      'exchange-products-success-response',
      '',
      () => this.redirectToHome(1)
    );
  }

  submit() {
    const data = {
      email:this.myForm.get('email')?.value,
      name:this.myForm.get('name')?.value,
      title:this.myForm.get('title')?.value,
      suggest:this.myForm.get('suggest')?.value
    }
    this.requestUseCase
      .postSuggest(
        data
      )
      .pipe(
        catchError((error) => {
          this.showAlertBad();
          return throwError(error); 
        })
      )
      .subscribe((response) => {
        if (response.success === true) {
          this.showAlertSuccess();
        }
      });
  }
}
