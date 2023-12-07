import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from 'src/store/models/cart.model';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { Router } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.page.html',
  styleUrls: ['./campaign-details.page.scss'],
})
export class CampaignDetailsPage implements OnInit {
  campaignData:any;
  campaign:any;
  campaignList: any[] = [
    {
      price: 123123,
      product: {
        name: 'asdasdasdasd',
        description: 'asdasdasdasdasdasdasdas',
        image:
          'https://images.applicorera3jjjs.com/ImageHandler.php?src=../storage/2020_07_01_21_39_40_old-parr-750ml.png',
      },
    },
    {
      price: 123123,
      product: {
        name: 'asdasdasdasd',
        description: 'asdasdasdasdasdasdasdas',
        image:
          'https://images.applicorera3jjjs.com/ImageHandler.php?src=../storage/2020_07_01_21_39_40_old-parr-750ml.png',
      },
    },
    {
      price: 123123,
      product: {
        name: 'asdasdasdasd',
        description: 'asdasdasdasdasdasdasdas',
        image:
          'https://images.applicorera3jjjs.com/ImageHandler.php?src=../storage/2020_07_01_21_39_40_old-parr-750ml.png',
      },
    },
  ];

  constructor(
    private location: Location,
    private router:Router,
    private shareObjectService: ShareObjectService,
    private requestUseCase:RequestUseCases
  ) {}

  ngOnInit() {
    this.campaignData = this.shareObjectService.getObjetoCompartido();
    this.getCampignDetail(this.campaignData.id);
  }

  goBack(): void {
    this.location.back();
  }

  routerLink(id:number){
    this.router.navigate(['/store-detail/' + id])
  }

  getCampignDetail(id:string){
    this.requestUseCase.getCampainsById(id).subscribe(response => {
      if (response.success === true) {
        this.campaign = response.data
        console.log( this.campaign);
        
      } else {
        console.log(response);
      }
    })
  }

  getProductDetail(data:any){
    this.shareObjectService.setObjetoCompartido(data.store)
    console.log(data.store);
    this.router.navigate(['/product-details']);
  }

}
