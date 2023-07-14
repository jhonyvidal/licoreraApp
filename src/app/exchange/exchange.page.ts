import { Component, OnInit } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
})
export class ExchangePage implements OnInit {

  products: any = [];

  constructor(
    private requestUseCase: RequestUseCases
  ) { }

  ngOnInit() {
    this.requestUseCase.getPromotions('token', 1).subscribe(response => {
      if (response.success === true) {
        console.log('Promotions: ', response.data);
        this.products = response.data.data;
        console.log(response.data.data);

      } else {
        console.log('Body del error: ', response);
      }
    })
  }

}
