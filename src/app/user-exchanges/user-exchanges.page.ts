import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-user-exchanges',
  templateUrl: './user-exchanges.page.html',
  styleUrls: ['./user-exchanges.page.scss'],
})
export class UserExchangesPage implements OnInit {

  constructor(
    private router: Router,
    private requestUseCase: RequestUseCases,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUserExchanges();
  }

  goToUser() {
    this.router.navigate(['/user']);
  }

  getUserExchanges() {
    this.userService.getUserData().then(data => {
      console.log('user data from user exchanges: ', data);
      
      if(data?.api_token){
        this.requestUseCase.getUserExchangeProducts(data.api_token, '1').subscribe( response => {
          if (response.success === true) {
            console.log('User exchange products: ', response);
          }
        })
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });


    // this.requestUseCase.getRecommendedProducts('token').subscribe(response => {
    //   if (response.success === true) {
    //     this.numberOfApiProducts = response.data.length;
    //     for (let index = 0; index < this.numberOfItems; index++) {
    //       if (response.data[this.position]) {
    //         this.products.push(response.data[this.position]);
    //         this.position++;
    //       }
    //     }
    //   } else {
    //     console.log('Body del error: ', response);
    //   }
    // })
  }

}
