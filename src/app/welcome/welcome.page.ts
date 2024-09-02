import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
// import { DepartmentEmployeesService } from 'src/store/services/department-employees.service';
import { ConfigData, Department } from 'src/store/models/employee-dept';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
// import { InitializeAppService } from 'src/store/services/initialize.app.service';
// import { SQLiteService } from 'src/store/services/sqlite.service';
// import { ConfigService } from 'src/store/services/config.service';
import { InfoService } from 'src/store/services/info.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    // private initAppService: InitializeAppService,
    // private sqliteService: SQLiteService,
    public formBuilder: FormBuilder,
    // private departmentEmployeesService: DepartmentEmployeesService,
    // private configService: ConfigService,
    private toast: ToastController,
    private router: Router,
    private requestUseCase: RequestUseCases,
    private infoService:InfoService
  ) {
    this.myForm = this.formBuilder.group({
      birthdayModal: ['', []],
      birthday: ['', [Validators.required, this.fechaNacimientoValidator]],
      condition: [false, Validators.required]
    });
    this.getInfo();
  }

  @Output() toUpdateConfig = new EventEmitter<{ command: string, database: string, config: ConfigData }>();

  isNative: boolean = false;
  isEncrypt: boolean = false;
  isFormValid = false;
  isAndroid: boolean = false;
  isCheckboxChecked = false;
  modalDateTime = false;
  buttonWelcome = 'buttonWelcome';
  myForm: FormGroup;
  public configList: ConfigData[] = [];

  async ngOnInit() {
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.classValid()
    });
    this.myForm.get('condition')?.valueChanges.subscribe(value => {
      this.isCheckboxChecked = value;
      this.classValid()
    });
    this.myForm.get('birthdayModal')?.valueChanges.subscribe(value => {
      this.myForm.patchValue({
        birthday: this.convertDateFormat(this.myForm.get('birthdayModal')?.value.split('T')[0])
      });
    });
    
  }

  classValid() {
    if (this.myForm.valid && this.isCheckboxChecked) {
      this.buttonWelcome = 'ActivebuttonWelcome'
    } else {
      this.buttonWelcome = 'buttonWelcome'
    }
  }

  getInfo(){
    this.infoService.getInfoData()
    .then(data => {
      console.log(data);
      
      if(data?.isWelcome){
        this.router.navigate(['/home']);
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos de la info:', error);
    });
  }

  fechaNacimientoValidator(control: any) {

    const partesFecha = control.value.split("/"); 
  
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1;
    const anio = parseInt(partesFecha[2], 10);

    const fechaSeleccionada = new Date(anio, mes, dia);
    
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);

    if (fechaSeleccionada > fechaMinima) {
      return { fechaInvalida: true };
    }

    return null;
  }

  modalDate(){
    this.modalDateTime = true;
  }


  async redirectTo() {
    // const config:ConfigData = { id: 1, name: "Welcome", data: "true" }
    // const result = this.configService.getConfig(config)
    const setWelcome = await this.infoService.setIsWelcome(true);
    if(setWelcome){
      this.router.navigate(['/home']);
    }
    
    // if(this.sqliteService.platform === "web") {
    //   await this.sqliteService.sqliteConnection.saveToStore(this.configService.databaseName);
    // }

    // await this.configService.updateConfig(config);
  }

  convertDateFormat(dateString: string): string {
    const dateParts = dateString.split('-'); // Separar los componentes de la fecha
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}/${month}/${year}`; // Construir la fecha en formato DD/MM/AAAA
  }


}
