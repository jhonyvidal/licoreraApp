import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-address-map',
  templateUrl: './new-address-map.page.html',
  styleUrls: ['./new-address-map.page.scss'],
})
export class NewAddressMapPage implements OnInit {

  myForm: FormGroup;
  isFormValid: boolean = true;
  btnCSS: string = 'btn-footer-disabled';

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      addressInput: ['', [Validators.required,]],
    });
  }

  ngOnInit() {
    this.myForm.valueChanges.subscribe(() => {
      if (this.myForm.valid) {
        this.isFormValid = false;
        this.btnCSS = 'btn-footer';
      }else{
        this.isFormValid = true;
        this.btnCSS = 'btn-footer-disabled';
      }
    });
  }

  goToNewAddress(){
    this.router.navigate(['/new-address']);
  }

  goToConfirmAddress(){
    this.router.navigate(['/new-address-confirm']);
  }

}
