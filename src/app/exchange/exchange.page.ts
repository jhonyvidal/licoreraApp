import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
})
export class ExchangePage implements OnInit {

  products: any = [];
  userPoint:number;

  constructor(
    private requestUseCase: RequestUseCases,
    private router: Router,
    private userService: UserService
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
    this.getUser()
  }

  routerLink(route:string){
    this.router.navigate(['/' + route])
  }

  getUser(){
    this.userService.getUserData()
    .then(data => {
      console.log(data.points)
      this.userPoint = data.points;
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
  }

}
