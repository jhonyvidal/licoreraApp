import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor() {}

  selectedTab: string = 'tab1'; 

  changeTab(tab: string) {
    this.selectedTab = tab;
  }
  

}
