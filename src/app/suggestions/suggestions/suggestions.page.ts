import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { presentAlertExchange } from 'src/shared/components/alert.exchange.component';

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
    private alertController: AlertController
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

  async showAlertSuccess() {
    await presentAlertExchange(
      this.alertController,
      '¡felicitaciones!',
      'Tu sugerencia ha sido enviada exitosamente y la atenderemos muy pronto. Trabajamos para mejorar.',
      'exchange-products-success-response'
    );
  }

  submit() {
    if (!this.suggested) {
      this.showAlertBad();
    }else {
      this.showAlertSuccess();
    }
  }

}
