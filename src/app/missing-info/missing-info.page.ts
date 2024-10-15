import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { ClientData } from 'src/shared/domain/response/ClientResponse';
import { UserService } from 'src/store/services/user.service';
import { PresentLoaderComponent } from 'src/shared/Loader/PresentLoaderComponent';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { phoneMask } from 'src/shared/mask/mask';

@Component({
  selector: 'app-missing-info',
  templateUrl: './missing-info.page.html',
  styleUrls: ['./missing-info.page.scss'],
})
export class MissingInfoPage implements OnInit {

  myForm: FormGroup;
  isFormValid = false;
  birthday = false;
  cellphone = false;
  docNumber = false;
  buttonStyle = 'DisableButton';
  client: any;
  readonly phoneMask: MaskitoOptions = phoneMask;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private requestUseCase: RequestUseCases,
    private router: Router,
    private presentLoaderComponent:PresentLoaderComponent,
  ) {
    // Inicializamos el formulario vacío
    this.myForm = this.formBuilder.group({});
  }

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el:any) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
    // Observa los cambios en el formulario para habilitar el botón de guardar
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.classValid();
    });
  }

  async ionViewDidEnter(){
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserData()
    .then(data => {
      // Agregamos los controles al formulario de manera dinámica según los datos faltantes
      this.client = data;
      
      if (!data.docNumber || data.docNumber === null) {
        this.docNumber = true;
        this.myForm.addControl('document', this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(6),
        ]));
      }
      
      if (!data.birthday || data.birthday === null) {
        this.birthday = true;
        this.myForm.addControl('date', this.formBuilder.control('', Validators.required));
      }
      
      if (!data.cellphone || data.cellphone === null) {
        this.cellphone = true;
        this.myForm.addControl('phone', this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13)
        ]));
      }

      // Asegúrate de que el formulario es reactivo y de que se actualizan correctamente los controles
      this.myForm.updateValueAndValidity();  // <- Esto asegura que se reevalúe la validez del formulario
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
  }

  classValid() {
    if (this.myForm.valid) {
      this.buttonStyle = 'Activebutton';
    } else {
      this.buttonStyle = 'DisableButton';
    }
  }

  submit(){   
    this.presentLoaderComponent.showHandleLoading(); 
    const formValues = this.myForm.value;

    // Filtrar los campos no vacíos
    const filledFields = Object.keys(formValues)
    .filter(key => formValues[key] !== '' && formValues[key] !== null && formValues[key] !== undefined)
    .reduce((acc: any, key) => {
      // Renombrar los campos según sea necesario
      if (key === 'date') {
        acc['birthday'] = formValues[key];  // Cambia 'date' por 'birthday'
      } else if (key === 'phone') {
        acc['cellphone'] = formValues[key].replaceAll(' ', '');  // Cambia 'phone' por 'cellphone'
      }else if (key === 'document'){
        acc['docNumber'] = formValues[key];
      } else {
        acc[key] = formValues[key];  // Mantén los otros campos con el mismo nombre
      }
      return acc;
    }, {});
    
    this.requestUseCase.putClient(this.client.id, filledFields).subscribe(response => {
      if (response.success === true) {
        this.router.navigate(['/home']);
        this.presentLoaderComponent.hideHandleLoading();
      }
    });
  
  }

}
