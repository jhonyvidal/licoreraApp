import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { Data, DataArray } from 'src/shared/domain/response/PromotionsData';

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.page.html',
  styleUrls: ['./recent-order.page.scss'],
})
export class RecentOrderPage implements OnInit {

  status: string = 'Completado';
  pageNumber: number = 1;
  productsArray: DataArray [] = [];

  constructor(
    private location: Location,
    private requestUseCase: RequestUseCases
  ) { }

  ngOnInit() {
    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
      if (response.success === true) {
        console.log('Promotions: ', response);
        for (let index = 0; index < 6; index++) {
          this.productsArray.push(response.data.data[index]);
        }
        console.log(this.productsArray);
      } else {
        console.log('Body del error: ', response);
      }
    })

  }

  goBack(): void {
    this.location.back();
  }

}
