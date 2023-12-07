import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { Data, DataArray } from 'src/shared/domain/response/PromotionsData';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { UserService } from 'src/store/services/user.service';
import { OrdersData } from 'src/shared/domain/response/OrdersData';

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.page.html',
  styleUrls: ['./recent-order.page.scss'],
})
export class RecentOrderPage implements OnInit {

  status: string = 'Completado';
  pageNumber: number = 1;
  productsArray: DataArray [] = [];
  OrderId:number;
  Order:any;

  constructor(
    private location: Location,
    private requestUseCase: RequestUseCases,
    private shareObjectService : ShareObjectService,
    private userService:UserService,
  ) { }

  ngOnInit() {
    this.OrderId = this.shareObjectService.getObjetoCompartido().id; 
    this.getPost(this.OrderId);

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

  async getPost(id:number){
    const token = await this.getToken()
    this.requestUseCase
    .getOrderById(
      token,
      id
    )
    .subscribe(
      (response) => {
        if (response.success === true) {
          this.Order = response.data
          console.log(this.Order);
          
          console.log('success', response);
        } else {
          console.log('success', response);
        }
      },
      (error) => {
        console.error('Ha ocurrido un error:', error);
      }
    );
  }

  getToken() {
    const response = this.userService.getUserData()
    .then(data => {
      console.log('Api token: ', data.api_token);
      return data.api_token
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      return 'Error al obtener los datos del usuario'
    });
    return response;
  }

  goBack(): void {
    this.location.back();
  }

}
