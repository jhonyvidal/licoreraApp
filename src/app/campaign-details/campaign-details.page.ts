import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from 'src/store/models/cart.model';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.page.html',
  styleUrls: ['./campaign-details.page.scss'],
})
export class CampaignDetailsPage implements OnInit {
  campaignData:any;
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
    private shareObjectService: ShareObjectService
  ) {}

  ngOnInit() {
    this.campaignData = this.shareObjectService.getObjetoCompartido();
  }

  goBack(): void {
    this.location.back();
  }

  routerLink(id:number){
    this.router.navigate(['/store-detail/' + id])
  }

  getProductDetail(data:any){
    this.shareObjectService.setObjetoCompartido(data.store)
    console.log(data.store);
    this.router.navigate(['/product-details']);
  }

}
