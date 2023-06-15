import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestGateway } from 'src/services/domains/gateway/request-gateway';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { BaseApiService } from 'src/shared/infraestructure/base-api.service';

@Injectable()
export  class RequestApiService extends RequestGateway {


  constructor(private http: BaseApiService,private https: HttpClient) {super();}

  getBasicData(token: string): Observable<BasicDataOut> {
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ token});
    return this.http.get('isActive',headers).pipe(
      map(response => {
        console.log(response)
        return response as BasicDataOut
      })
    )
  }

}
