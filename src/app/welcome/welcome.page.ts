import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { DepartmentEmployeesService } from 'src/store/services/department-employees.service';
import { Department } from 'src/store/models/employee-dept';

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
    private router: Router
  ) { }

  mainForm: FormGroup;
  public departmentList: Department[] = [];

  ngOnInit() {
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
  }


}
