import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  
  constructor(private router: Router) {
  }

  selectedTab: string = 'tab1'; 
 
  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  routerLink(route:string){
    this.router.navigate(['/' + route])
  }
  

}
