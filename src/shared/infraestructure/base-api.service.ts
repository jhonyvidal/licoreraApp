import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginV2Request } from '../domain/request/LoginV2Request';
import { DeletePaymentMethodsRequest, PostPaymentMethodsRequest } from '../domain/request/DeletePaymentRequest';
import { CreateLocationRequest } from '../domain/request/CreateLocation';
import { FavoriteLocationsRequest } from '../domain/request/FavoriteLocations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private url = environment.apiUrl;
  private urlV2 = environment.apiUrlV2;
  private urlApiGoogleMap = environment.apiGoogleMap;
  private ApiKey = environment.ApiKey;
  // private http: HttpClient;

  constructor(private http: HttpClient) { 
    // this.http = new HttpClient(handler);
  }

  get(path: string, headers?:HttpHeaders) {
    return this.http.get(`${this.url}${path}`, { headers });
  }

  post(path: string, data: any, headers?:HttpHeaders) {
    return this.http.post(`${this.url}${path}`, data , { headers } );
  }

  put(path: string, data: any) {
    return this.http.put(`${this.url}${path}`, data);
  }

  delete(path: string,) {
    return this.http.delete(`${this.url}${path}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );
  }

  // Api v2
  getV2(path: string, headers?: HttpHeaders) {
    return this.http.get(`${this.urlV2}${path}`, {headers});
  }

  postV2(path: string, data: any, headers?:HttpHeaders) {
    return this.http.post(`${this.urlV2}${path}`, data , { headers } );
  }

  putv2(path: string, data: any, headers?:HttpHeaders) {
    return this.http.put(`${this.urlV2}${path}`, data, { headers });
  }

  postDelete(path: string, data: DeletePaymentMethodsRequest, headers?:HttpHeaders) {
    return this.http.post(`${this.urlV2}${path}`, data , { headers } );
  }

  postPaymentMethods(path: string, data: PostPaymentMethodsRequest, headers?:HttpHeaders) {
    return this.http.post(`${this.urlV2}${path}`, data , { headers } );
  }

  ResetPassword(path: string, data: any, headers?:HttpHeaders) {
    return this.http.post(`${path}`, data , { headers } );
  }

  deleteAddress(path: string, headers?:HttpHeaders) {
    return this.http.delete(`${this.urlV2}${path}`, { headers } );
  }

  deleteFavoriteLocations(path: string, headers?:HttpHeaders) {
    return this.http.delete(`${this.urlV2}${path}`, { headers } );
  }

}
