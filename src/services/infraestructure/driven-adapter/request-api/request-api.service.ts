import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestGateway } from 'src/services/domains/gateway/request-gateway';
import { ActiveResponse } from 'src/shared/domain/response/ActiveResponse';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import { BaseApiService } from 'src/shared/infraestructure/base-api.service';

@Injectable()
export  class RequestApiService extends RequestGateway {


  constructor(private http: BaseApiService,private https: HttpClient) {super();}

  getBasicData(token: string): Observable<BasicDataOut> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('promotions',headers).pipe(
      map(response => {
        return response as BasicDataOut
      })
    )
  }

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

  getPromotions(token: string): Observable<suggestedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('promotions',headers).pipe(
      map(response => {
        return response as suggestedProducts
      })
    )
  }

  

}
