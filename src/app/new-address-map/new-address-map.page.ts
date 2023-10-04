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

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      addressInput: ['', [Validators.required,]],
    });
  }

  ngOnInit() {
  }

  goToNewAddress(){
    this.router.navigate(['/new-address']);
  }

  goToConfirmAddress(){
    this.router.navigate(['/new-address']);
  }

}
