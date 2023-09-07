import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestGateway } from 'src/services/domains/gateway/request-gateway';
import { ActiveResponse } from 'src/shared/domain/response/ActiveResponse';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';
import { BaseApiService } from 'src/shared/infraestructure/base-api.service';
import { ProductSearch } from 'src/shared/domain/response/ProductSearch';
import { RecommendedProducts } from 'src/shared/domain/response/RecommendedProducts';
import { CategoriesOut } from 'src/shared/domain/response/Categories';
import { CategoriesByProductOut } from 'src/shared/domain/response/CategoriesByProduct';
import { LoginResponse } from 'src/shared/domain/response/LoginResponse';
import { CreateAccountRequest } from 'src/shared/domain/request/createAccount';
import { ClientData } from 'src/shared/domain/response/ClientResponse';
import { ClientPointsData } from 'src/shared/domain/response/ClientPointsData';
import { UpdateClientData } from 'src/shared/domain/request/UpdateClientData';

@Injectable()
export  class RequestApiService extends RequestGateway {

  constructor(private http: BaseApiService,private https: HttpClient) {super();}

  getIsActive(token: string): Observable<ActiveResponse> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('isActive',headers).pipe(
      map(response => {
        return response as ActiveResponse
      })
    )
  }


  getSuggestedProducts(token: string): Observable<suggestedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('suggestedProducts',headers).pipe(
      map(response => {
        return response as suggestedProducts
      })
    )
  }

  getProductSearch(token: string, inputSearched: string): Observable<ProductSearch> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('search?q=' + inputSearched,headers).pipe(
      map(response => {
        console.log(response)
        return response as BasicDataOut
      })
    )
  }

  getPromotion(token: string): Observable<suggestedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('promotions',headers).pipe(
      map(response => {
        return response as suggestedProducts
      })
    )
  }

  getPromotions(token: string, promotionPage: number): Observable<PromotionsData> {
    const headers = new HttpHeaders(/*{'Authorization': 'Bearer '+ token}*/);
    return this.http.get('promotionProducts?page=' + promotionPage, headers).pipe(
      map(response => {
        // console.log(response)
        return response as PromotionsData
      })
    )
  }

  getRecommendedProducts(token: string): Observable<RecommendedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('suggestedProducts',headers).pipe(
      map(response => {
        console.log(response)
        return response as BasicDataOut
      })
    )
  }

  getCategories(token:string):Observable<CategoriesOut> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('categories',headers).pipe(
      map(response => {
        console.log(response)
        return response as CategoriesOut
      })
    )
  }

  getCategoriesByProduct(token:string, id:string, page:number):Observable<CategoriesByProductOut> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('categories/' + id + '/products?page=' + page, headers).pipe(
      map(response => {
        console.log(response)
        return response as CategoriesByProductOut
      })
    )
  }

  getClient(token: string, userId: string):Observable<ClientData> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('clients/' + userId, headers).pipe(
      map(response => {
        console.log(response)
        return response as ClientData
      })
    )
  }

  getClientPoints(userId: string):Observable<ClientPointsData> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get(`clients/${userId}/points`, headers).pipe(
      map(response => {
        console.log(response)
        return response as ClientPointsData
      })
    )
  }

  postLogin(token:string, email:string, password:string):Observable<LoginResponse> {
    const data = {
      email:email,
      password:password
    }
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.post('login', data , headers).pipe(
      map(response => {
        console.log(response)
        return response as LoginResponse
      })
    )
  }

  postForgotPassword(token:string, email:string):Observable<LoginResponse> {
    const data = {
      email:email
    }
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.post('clients/rememberPassword', data , headers).pipe(
      map(response => {
        console.log(response)
        return response as LoginResponse
      })
    )
  }

  postCreateAccount(token:string, data:CreateAccountRequest):Observable<LoginResponse> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.post('clients', data , headers).pipe(
      map(response => {
        console.log(response)
        return response as LoginResponse
      })
    )
  }

  putClient(userId: string, data: UpdateClientData):Observable<ClientData> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.put(`clients/${userId}`, data).pipe(
      map(response => {
        console.log(response)
        return response as ClientData
      })
    )
  }


}
