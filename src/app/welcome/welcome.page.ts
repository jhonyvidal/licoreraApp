import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { DepartmentEmployeesService } from 'src/store/services/department-employees.service';
import { Department } from 'src/store/models/employee-dept';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
// import { ConfigService } from 'src/store/services/config.service';
import { InitializeAppService } from 'src/store/services/initialize.app.service';
import { SQLiteService } from 'src/store/services/sqlite.service';

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
    // private configService:ConfigService,
    private toast: ToastController,
    private router: Router,
    private requestUseCase: RequestUseCases
  ) { 
    this.myForm = this.formBuilder.group({
      birthday: ['', Validators.required],
      condition: ['', Validators.required ]
    });
  }

  isNative: boolean = false;
  isEncrypt: boolean = false;
  isFormValid = false;
  isAndroid: boolean = false;
  isCheckboxChecked = false;
  buttonWelcome = 'buttonWelcome';
  myForm: FormGroup;
  public departmentList: Department[] = [];

  async ngOnInit() {
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.classValid()
    });
    this.myForm.get('condition')?.valueChanges.subscribe(value => {
      this.isCheckboxChecked = value;
      this.classValid()
    });
    if (this.initAppService.platform === 'android') {
      this.isAndroid = true;
    }
    this.isNative = this.sqliteService.native;
    this.isEncrypt = this.isNative &&
      (await this.sqliteService.isInConfigEncryption()).result
      ? true : false;
    try {
      this.departmentEmployeesService.departmentState().subscribe((res) => {
        if(res) {
          this.departmentEmployeesService.fetchEmployees().subscribe(data => {
            console.log(res, data);
          });
        }
      });
    } catch(err) {
      console.log(err,this.departmentList);
      throw new Error(`Error: ${err}`);
    }

    // this.configService.fetchConfigs().subscribe(data => {
    //   console.log(data);
    // });
    
    this.requestUseCase.getBasicData('token').subscribe(response => {
        if (response.success === true) {
          console.log(response);
        } else {
          console.log(response);
        }
    })
  }

  classValid(){
    if(this.myForm.valid && this.isCheckboxChecked){
      this.buttonWelcome = 'ActivebuttonWelcome'
    }else{
      this.buttonWelcome = 'buttonWelcome'
    }
  }


  redirectTo() {
    this.router.navigate(['/home']);
  }


}
