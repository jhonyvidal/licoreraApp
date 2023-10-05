import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-address-confirm',
  templateUrl: './new-address-confirm.page.html',
  styleUrls: ['./new-address-confirm.page.scss'],
})
export class NewAddressConfirmPage implements OnInit {

  myForm: FormGroup;
  isFormValid: boolean = true;
  radioButton: string = 'false';
  btnCSS: string = 'btn-footer-disabled';

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      address: ['', [Validators.required,]],
      details: ['', [Validators.required]],
      // name: ['', this.radioButton === "true" ? [Validators.required] : ''],
      name: ['',],
    });
  }

  ngOnInit() {

    this.myForm.valueChanges.subscribe(() => {
      this.validations();
    });
  }

  goToNewAddressMap(){
    this.router.navigate(['/new-address-map']);
  }

  saveLocationForFuture(){
    if (this.radioButton === "false") {
      this.radioButton = "true";
    }else{
      this.radioButton = "false";
    }
    this.validations();
  }

  validations(){
    if (this.radioButton === 'false' && this.myForm.get('address')?.value != '' && this.myForm.get('details')?.value != '') {
      this.isFormValid = false;
      this.btnCSS = 'btn-footer';
    }else if(this.radioButton === 'true' && this.myForm.get('address')?.value != '' && this.myForm.get('details')?.value != '' && this.myForm.get('name')?.value) {
      this.isFormValid = false;
      this.btnCSS = 'btn-footer';
    }else {
      this.isFormValid = true;
      this.btnCSS = 'btn-footer-disabled';
    }
  }

}
