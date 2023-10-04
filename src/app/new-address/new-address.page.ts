import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],
})
export class NewAddressPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  currentLocation(){
    console.log('Current location');
  }

  goToMap(){
    this.router.navigate(['/new-address-map']);
  }

}
