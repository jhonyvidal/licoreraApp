import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { DepartmentEmployeesService } from 'src/store/services/department-employees.service';
import { Department } from 'src/store/models/employee-dept';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private departmentEmployeesService: DepartmentEmployeesService,
    private toast: ToastController,
    private router: Router,
    private requestUseCase: RequestUseCases
  ) { 
    this.myForm = this.formBuilder.group({
      birthday: ['', Validators.required],
      condition: ['', Validators.required ]
    });
  }

  isFormValid = false;
  isCheckboxChecked = false;
  buttonWelcome = 'buttonWelcome';
  myForm: FormGroup;
  public departmentList: Department[] = [];

  ngOnInit() {
    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
      this.classValid()
    });
    this.myForm.get('condition')?.valueChanges.subscribe(value => {
      this.isCheckboxChecked = value;
      this.classValid()
    });
    try {
      this.departmentEmployeesService.departmentState().subscribe((res) => {
        if(res) {
          this.departmentEmployeesService.fetchDepartments().subscribe(data => {
            this.departmentList = data;
          });
          console.log(res, this.departmentList);
        }
      });
    } catch(err) {
      console.log(err,this.departmentList);
      throw new Error(`Error: ${err}`);
    }

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
