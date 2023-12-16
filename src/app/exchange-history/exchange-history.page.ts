import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exchange-history',
  templateUrl: './exchange-history.page.html',
  styleUrls: ['./exchange-history.page.scss'],
})
export class ExchangeHistoyrPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  goHome(){
    this.router.navigate(['/user']);
  }
  


}
