import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestGateway } from 'src/services/domains/gateway/request-gateway';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';
import { BaseApiService } from 'src/shared/infraestructure/base-api.service';
import { ProductSearch } from 'src/shared/domain/response/ProductSearch';

@Injectable()
export  class RequestApiService extends RequestGateway {

  constructor(private http: BaseApiService,private https: HttpClient) {super();}

  getBasicData(token: string): Observable<BasicDataOut> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('promotions',headers).pipe(
      map(response => {
        console.log(response)
        return response as BasicDataOut
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

}
