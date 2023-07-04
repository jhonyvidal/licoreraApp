import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { DepartmentEmployeesService } from 'src/store/services/department-employees.service';
import { ConfigData, Department } from 'src/store/models/employee-dept';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { InitializeAppService } from 'src/store/services/initialize.app.service';
import { SQLiteService } from 'src/store/services/sqlite.service';
import { ConfigService } from 'src/store/services/config.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private initAppService: InitializeAppService,
    private sqliteService: SQLiteService,
    public formBuilder: FormBuilder,
    private departmentEmployeesService: DepartmentEmployeesService,
    private configService: ConfigService,
    private toast: ToastController,
    private router: Router,
    private requestUseCase: RequestUseCases,
  ) {
    this.myForm = this.formBuilder.group({
      birthday: ['', [Validators.required, this.fechaNacimientoValidator]],
      condition: [false, Validators.required]
    });
  }

  @Output() toUpdateConfig = new EventEmitter<{ command: string, database: string, config: ConfigData }>();

  isNative: boolean = false;
  isEncrypt: boolean = false;
  isFormValid = false;
  isAndroid: boolean = false;
  isCheckboxChecked = false;
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
    
  }

  classValid() {
    if (this.myForm.valid && this.isCheckboxChecked) {
      this.buttonWelcome = 'ActivebuttonWelcome'
    } else {
      this.buttonWelcome = 'buttonWelcome'
    }
  }

  fechaNacimientoValidator(control: any) {
    const fechaSeleccionada = new Date(control.value);
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);

    if (fechaSeleccionada > fechaMinima) {
      console.log(fechaSeleccionada, fechaMinima)
      return { fechaInvalida: true };
    }

    return null;
  }


  async redirectTo() {
    const config:ConfigData = { id: 1, name: "Welcome", data: "true" }
    const result = this.configService.getConfig(config)

    this.router.navigate(['/home']);
    
    if(this.sqliteService.platform === "web") {
      await this.sqliteService.sqliteConnection.saveToStore(this.configService.databaseName);
    }

    await this.configService.updateConfig(config);

    
  }


}
