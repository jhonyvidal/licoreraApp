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
  
}
