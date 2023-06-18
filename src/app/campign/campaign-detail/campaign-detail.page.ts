import { Component, OnInit } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { Product } from 'src/shared/domain/response/PromotionsData';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.page.html',
  styleUrls: ['./campaign-detail.page.scss'],
})
export class CampaignDetailPage implements OnInit {

  pageNumber: number = 1;
  product: Product = {};

  constructor(
    private requestUseCase: RequestUseCases
  ) { }

  ngOnInit() {

    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
        if (response.success === true) {
          // console.log('Promotions: ', response.data.data[0]);
          console.log('Promotions: ', response.data);
          this.product = {...response.data.data[0].product}
          // console.log(this.product);
        } else {
          console.log('Body del error: ', response);
        }
    })

  }

}
