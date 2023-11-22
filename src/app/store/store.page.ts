import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { CategoriesOut } from 'src/shared/domain/response/Categories';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  constructor(private requestUseCase: RequestUseCases,
    private router: Router) { }

  public ListCategories:CategoriesOut[];
  elementos: CategoriesOut[] = [];
  loaded:boolean=false;

  ngOnInit() {
    this.loaded=true;
    this.requestUseCase.getCategories('token').subscribe(response => {
      if (response.success === true) {
        response.data.forEach((elemento:any,indice:number) => {
          this.elementos.push(elemento);
        });
        this.ListCategories = this.elementos;
        setTimeout(() => {
          this.loaded=false;
        }, 2000);
        console.log(this.ListCategories);
      } else {
        console.log(response);
      }
    })
  }

  routerLink(id:number){
    this.router.navigate(['/store-detail/' + id])
  }



}
