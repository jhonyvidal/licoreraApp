import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { OrdersData } from 'src/shared/domain/response/OrdersData';
import { UserService } from 'src/store/services/user.service';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { SignInObjectService } from 'src/shared/services/signInObject';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.page.html',
  styleUrls: ['./recent-orders.page.scss'],
})
export class RecentOrdersPage implements OnInit {

  orders: OrdersData[] = [];
  ordersComplete: OrdersData[] = [];
  page: number = 1;

  constructor(
    private location: Location,
    private router: Router,
    private userService:UserService,
    private requestUseCase: RequestUseCases,
    private shareObjectService: ShareObjectService,
    private signInObjectService:SignInObjectService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  goBack(): void {
    this.location.back();
  }

  routerLink(route:string,data:OrdersData){
    this.shareObjectService.setObjetoCompartido(data)
    this.router.navigate(['/' + route])
  }

  async getPosts(){
    const token = await this.getToken()
    this.requestUseCase
    .getOrder(
      token,
      this.page
    )
    .subscribe(
      (response) => {
        if (response.success === true) {
          response.data.data.forEach((elemento:any,indice:number) => {
            this.orders.push(elemento);
          });
          this.page++ 
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
      this.signInObjectService.setObjetoCompartido("/recent-orders")
      this.router.navigate(['/sign-in']);
      return 'Error al obtener los datos del usuario'
    });
    return response;
  }

  loadData(event: any) {
    setTimeout(() => {
      this.getPosts();
     event.target.complete();
    }, 1000);
  }


}
