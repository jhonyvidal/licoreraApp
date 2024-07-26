import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-user-exchanges',
  templateUrl: './user-exchanges.page.html',
  styleUrls: ['./user-exchanges.page.scss'],
})
export class UserExchangesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  exchangeProducts: any = [];
  currentPage: string = '1';
  lastPage: string = '';
  showInfiniteScroll: boolean = true;

  constructor(
    private router: Router,
    private requestUseCase: RequestUseCases,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // this.getUserExchanges();
  }

  ionViewWillEnter() {
    this.exchangeProducts = [];
    this.currentPage = '1';
    this.lastPage = '';
    this.showInfiniteScroll = true;
    this.infiniteScroll.disabled = false;
    this.getUserExchanges();
  }

  goToUser() {
    this.router.navigate(['/user']);
  }

  getUserExchanges() {
    this.userService.getUserData().then(data => {
      console.log('user data from user exchanges: ', data);
      if(data?.api_token){
        this.requestUseCase.getUserExchangeProducts(data.api_token, this.currentPage).subscribe( response => {
          if (response.success === true) {

            for (let index = 0; index < response.data.data.length; index++) {
              this.exchangeProducts.push(response.data.data[index]);
            }
            // this.exchangeProducts = response.data.data;
            this.lastPage = response.data.last_page.toString();
            this.currentPage = response.data.next_page_url === null ? '' : response.data.next_page_url.slice(response.data.next_page_url.length - 1);
            console.log('Current page: ', this.currentPage);
            console.log('Last page: ', this.lastPage);
            console.log('User exchange products: ', this.exchangeProducts);
          }
        })
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
  }

  loadData(event: any) {
    console.log('cargando los siguientes...');

    setTimeout(() => {
      console.log('El estúpido current page: ', this.currentPage);
      
      if (this.currentPage > this.lastPage || this.currentPage === '') {
        event.target.complete;
        this.showInfiniteScroll = false;
        this.infiniteScroll.disabled = true;
        // this.listClass = 'grid-list-padding';
        return;
      }

      this.getUserExchanges();

      event.target.complete();
    }, 1000);

  }

}
